// SpacetimeDB imports
use spacetimedb::{table, reducer, ReducerContext, Identity, Table, Timestamp, SpacetimeType};

// --- Domain Types and Constants ---

#[derive(SpacetimeType, Clone, Debug)]
pub enum RequestStatus {
    Pending,
    InProgress,
    Completed,
    Cancelled,
}

// Simple server-side FX rate (Kwacha per 1 USDC)
const EXCHANGE_RATE_KWACHA_PER_USDC: f64 = 26.5;

// Utility: round to 2 decimal places (currency display)
fn round2(v: f64) -> f64 {
    (v * 100.0).round() / 100.0
}

// --- Tables ---

// All exchange requests (public for admin dashboard subscription)
#[table(name = exchange_request, public)]
#[derive(Clone)]
pub struct ExchangeRequest {
    #[primary_key]
    #[auto_inc]
    request_id: u64,

    // Requester and contact details
    user_identity: Identity,
    user_wallet_address: String,
    phone_number: String,
    full_name: String,

    // Amounts (stored as f64 for simplicity; consider integer minor units for production)
    usdc_amount: f64,
    kwacha_amount: f64, // calculated on creation

    // Request lifecycle
    status: RequestStatus,
    created_at: Timestamp,

    // Free-form notes (user or admin)
    notes: String,
}

// Admin identities (who can manage requests)
#[table(name = admin)]
#[derive(Clone)]
pub struct Admin {
    #[primary_key]
    identity: Identity,
    added_at: Timestamp,
}

// --- Helpers ---

fn is_admin(ctx: &ReducerContext, who: Identity) -> bool {
    ctx.db.admin().identity().find(&who).is_some()
}

// --- Reducers ---

// Create a new exchange request
#[reducer]
pub fn create_exchange_request(
    ctx: &ReducerContext,
    user_wallet_address: String,
    phone_number: String,
    full_name: String,
    usdc_amount: f64,
    notes: String,
) -> Result<(), String> {
    if usdc_amount <= 0.0 {
        return Err("USDC amount must be greater than 0.".into());
    }

    // Calculate Kwacha amount from server-side FX rate
    let kwacha_amount = round2(usdc_amount * EXCHANGE_RATE_KWACHA_PER_USDC);

    let row = ExchangeRequest {
        request_id: 0, // auto_inc
        user_identity: ctx.sender,
        user_wallet_address,
        phone_number,
        full_name,
        usdc_amount: round2(usdc_amount),
        kwacha_amount,
        status: RequestStatus::Pending,
        created_at: ctx.timestamp,
        notes,
    };

    match ctx.db.exchange_request().try_insert(row) {
        Ok(inserted) => {
            spacetimedb::log::info!(
                "Created exchange request {} for user {}",
                inserted.request_id,
                inserted.user_identity
            );
            Ok(())
        }
        Err(e) => {
            let msg = format!("Failed to create exchange request: {}", e);
            spacetimedb::log::error!("{}", msg);
            Err(msg)
        }
    }
}

// Update request status (admin only)
#[reducer]
pub fn update_request_status_admin(
    ctx: &ReducerContext,
    request_id: u64,
    new_status: RequestStatus,
    notes: String,
) -> Result<(), String> {
    if !is_admin(ctx, ctx.sender) {
        return Err("Only admins may update request status.".into());
    }

    if let Some(mut req) = ctx.db.exchange_request().request_id().find(&request_id) {
        // Prevent redundant updates
        let current_status_str = format!("{:?}", req.status);
        let new_status_str = format!("{:?}", new_status.clone());

        req.status = new_status;
        if !notes.is_empty() {
            if req.notes.is_empty() {
                req.notes = notes.clone();
            } else {
                req.notes = format!("{} | {}", req.notes, notes);
            }
        }

        // Store anything needed for logging BEFORE update (to avoid moved value)
        let req_id = req.request_id;
        let owner = req.user_identity;

        ctx.db.exchange_request().request_id().update(req);

        spacetimedb::log::info!(
            "Admin {} updated request {} (owner {}) from {} to {}",
            ctx.sender,
            req_id,
            owner,
            current_status_str,
            new_status_str
        );
        Ok(())
    } else {
        Err(format!("Exchange request {} not found.", request_id))
    }
}

// User marks their request as completed
#[reducer]
pub fn mark_request_completed_by_user(
    ctx: &ReducerContext,
    request_id: u64,
    notes: String,
) -> Result<(), String> {
    if let Some(mut req) = ctx.db.exchange_request().request_id().find(&request_id) {
        if req.user_identity != ctx.sender {
            return Err("You can only modify your own requests.".into());
        }

        match req.status {
            RequestStatus::Completed | RequestStatus::Cancelled => {
                return Err("Request is already finalized.".into());
            }
            _ => {}
        }

        let prev_status = format!("{:?}", req.status);
        req.status = RequestStatus::Completed;
        if !notes.is_empty() {
            if req.notes.is_empty() {
                req.notes = notes.clone();
            } else {
                req.notes = format!("{} | {}", req.notes, notes);
            }
        }

        let req_id = req.request_id;

        ctx.db.exchange_request().request_id().update(req);

        spacetimedb::log::info!(
            "User {} marked request {} as Completed (previous status: {})",
            ctx.sender,
            req_id,
            prev_status
        );
        Ok(())
    } else {
        Err(format!("Exchange request {} not found.", request_id))
    }
}

// Admin dashboard: trigger-side effect (no return data; subscribe to exchange_request table)
#[reducer]
pub fn get_all_requests_for_admin(ctx: &ReducerContext) -> Result<(), String> {
    if !is_admin(ctx, ctx.sender) {
        return Err("Only admins may access the admin dashboard.".into());
    }

    let count = ctx.db.exchange_request().count();
    spacetimedb::log::info!(
        "Admin {} requested all exchange requests (total: {})",
        ctx.sender,
        count
    );

    // No returned data: clients should subscribe to `exchange_request` (public table)
    Ok(())
}

// Optional: bootstrap an admin (first admin can self-register; afterwards only admins can add others)
#[reducer]
pub fn add_admin(ctx: &ReducerContext, identity: Identity) -> Result<(), String> {
    let admin_count = ctx.db.admin().count();
    if admin_count > 0 && !is_admin(ctx, ctx.sender) {
        return Err("Only admins may add other admins.".into());
    }

    if ctx.db.admin().identity().find(&identity).is_some() {
        return Ok(()); // already admin, idempotent
    }

    let row = Admin {
        identity,
        added_at: ctx.timestamp,
    };

    match ctx.db.admin().try_insert(row) {
        Ok(a) => {
            spacetimedb::log::info!("Admin {} added by {}", a.identity, ctx.sender);
            Ok(())
        }
        Err(e) => {
            let msg = format!("Failed to add admin: {}", e);
            spacetimedb::log::error!("{}", msg);
            Err(msg)
        }
    }
}