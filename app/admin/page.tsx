'use client'; 
 
import Link from 'next/link'; 
import { Menu, Search, User, Bell, BarChart2, Users, FileText, Settings, LogOut, LayoutDashboard, TrendingUp, Edit, Home, ArrowRightLeft, Phone, CheckCircle2, Clock, AlertCircle, Shield, UserPlus, RefreshCw } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

// Import SpacetimeDB types and components
import { 
  DbConnection, 
  type EventContext, 
  type ExchangeRequest, 
  type Admin, 
  type RequestStatus,
  RemoteReducers,
  RemoteTables,
  SetReducerFlags
} from '@/spacetime_module_bindings';

// Mock wagmi hook for development
const useAccount = () => {
  return { address: '0x1234...5678', isConnected: true };
}; 

// Temporary mock components until we install the actual packages
const WalletDefault = () => <div className="p-2 glass rounded-full">Connect Wallet</div>;

// Enhanced interfaces for admin functionality
interface AdminUser {
  identity: string;
  addedAt: Date;
  isActive: boolean;
}

interface ExchangeRequestExtended extends ExchangeRequest {
  // ExchangeRequest already includes all necessary properties:
  // requestId, userIdentity, userWalletAddress, phoneNumber, fullName,
  // usdcAmount, kwachaAmount, status, createdAt, notes
}
 
export default function AdminPage() { 
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'notifications' | 'exchanges' | 'dashboard' | 'users' | 'settings' | 'admins'>('exchanges'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { address } = useAccount(); 
  const [db, setDb] = useState<DbConnection | null>(null); 
  const [reducers, setReducers] = useState<RemoteReducers | null>(null);
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequestExtended[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ExchangeRequestExtended | null>(null);
  const [statusUpdateNotes, setStatusUpdateNotes] = useState('');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filter exchange requests by status - these will be used throughout the component
  const pendingRequests = exchangeRequests.filter(req => req.status.tag === 'Pending');
  const inProgressRequests = exchangeRequests.filter(req => req.status.tag === 'InProgress');
  const completedRequests = exchangeRequests.filter(req => req.status.tag === 'Completed');
  const cancelledRequests = exchangeRequests.filter(req => req.status.tag === 'Cancelled');
  
  const stats = [ 
    { label: 'Total Users', value: '12,543', change: '+12%', icon: Users }, 
    { label: 'Active Opportunities', value: '6', change: '+2', icon: TrendingUp },
    { label: 'Total Exchanges', value: '1,234', change: '+8%', icon: ArrowRightLeft },
    { label: 'Revenue', value: '$45,678', change: '+15%', icon: TrendingUp },
    { label: 'Weekly Engagement', value: '89%', change: '+5%', icon: FileText }, 
    { label: 'Notifications Sent', value: '1,234', change: '+18%', icon: Bell }
  ];
  
  const opportunities = [ 
    { id: 1, title: 'Base Batch 002', status: 'Active', views: 1234, clicks: 456 }, 
    { id: 2, title: 'Zora Creator Pass', status: 'Active', views: 987, clicks: 321 }, 
    { id: 3, title: 'Onchain Summer', status: 'Active', views: 2341, clicks: 789 }, 
  ]; 
 
  const topUsers = [ 
    { address: '0x1234...5678', points: 98543, transactions: 15243 }, 
    { address: '0x2345...6789', points: 89234, transactions: 14102 }, 
    { address: '0x3456...7890', points: 82105, transactions: 12884 }, 
  ]; 
 
  // Admin functions
  const updateRequestStatus = async (requestId: bigint, newStatus: RequestStatus, notes: string) => {
    if (!reducers) return;
    
    setIsLoading(true);
    try {
      reducers.updateRequestStatusAdmin(requestId, newStatus, notes);
      setSelectedRequest(null);
      setStatusUpdateNotes('');
    } catch (error) {
      console.error('Failed to update request status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAdmin = async (identity: string) => {
    if (!reducers) return;
    
    setIsLoading(true);
    try {
      const identityObj = { __identity_bytes: identity } as any;
      reducers.addAdmin(identityObj);
    } catch (error) {
      console.error('Failed to add admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllRequests = async () => {
    if (!reducers) return;
    
    try {
      reducers.getAllRequestsForAdmin();
    } catch (error) {
      console.error('Failed to get all requests:', error);
    }
  };

  // Connect to SpacetimeDB 
  useEffect(() => { 
    const connectDb = async () => { 
      try { 
        const conn = await DbConnection.builder()
          .withUri('wss://testnet.spacetimedb.com')
          .withModuleName('diyama_exchange')
          .onConnect(async (connection, identity, token) => {
            console.log('Admin connected to SpacetimeDB');
            
            // Set up reducers
            setReducers(connection.reducers);
            
            // Subscribe to exchange requests
            await connection.db.exchangeRequest.onInsert((ctx: EventContext, req: ExchangeRequest) => {
              const extendedReq: ExchangeRequestExtended = {
                ...req,
                userWalletAddress: req.userWalletAddress || '',
                phoneNumber: req.phoneNumber || '',
                fullName: req.fullName || '',
                notes: req.notes || ''
              };
              setExchangeRequests(prev => [extendedReq, ...prev]);
            }); 
 
            await connection.db.exchangeRequest.onUpdate((ctx: EventContext, oldReq: ExchangeRequest, newReq: ExchangeRequest) => { 
              const extendedReq: ExchangeRequestExtended = {
                ...newReq,
                userWalletAddress: newReq.userWalletAddress || '',
                phoneNumber: newReq.phoneNumber || '',
                fullName: newReq.fullName || '',
                notes: newReq.notes || ''
              };
              setExchangeRequests(prev => 
                prev.map(r => r.requestId === newReq.requestId ? extendedReq : r) 
              ); 
            }); 

            // Subscribe to admin changes
            await connection.db.admin.onInsert((ctx: EventContext, admin: Admin) => {
              const adminUser: AdminUser = {
                identity: admin.identity.toString(),
                addedAt: new Date(admin.addedAt.toDate()),
                isActive: true
              };
              setAdminUsers(prev => [adminUser, ...prev]);
            });
 
            // Load existing requests 
            const allRequests = Array.from(connection.db.exchangeRequest.iter()) as ExchangeRequest[]; 
            const extendedRequests: ExchangeRequestExtended[] = allRequests.map(req => ({
              ...req,
              userWalletAddress: req.userWalletAddress || '',
              phoneNumber: req.phoneNumber || '',
              fullName: req.fullName || '',
              notes: req.notes || ''
            }));
            
            setExchangeRequests(extendedRequests.sort((a, b) => { 
              const timeA = new Date(a.createdAt.toDate()).getTime(); 
              const timeB = new Date(b.createdAt.toDate()).getTime(); 
              return timeB - timeA; 
            })); 

            // Load existing admins
            const allAdmins = Array.from(connection.db.admin.iter()) as Admin[];
            const adminUsers: AdminUser[] = allAdmins.map(admin => ({
              identity: admin.identity.toString(),
              addedAt: new Date(admin.addedAt.toDate()),
              isActive: true
            }));
            setAdminUsers(adminUsers);
          }) 
          .build(); 
        
        setDb(conn); 
      } catch (error) { 
        console.error('Failed to connect to SpacetimeDB:', error); 
      } 
    }; 
 
    if (address) { 
      connectDb(); 
    } else {
      // For development without wallet connection
      connectDb();
    } 
 
    return () => { 
      if (db) { 
        // Cleanup connection 
      } 
    }; 
  }, [address]); 
 
  const getStatusIcon = (status: RequestStatus) => { 
    switch (status.tag) { 
      case 'Pending': 
        return <Clock size={12} />; 
      case 'InProgress': 
        return <ArrowRightLeft size={12} />; 
      case 'Completed': 
        return <CheckCircle2 size={12} />; 
      case 'Cancelled': 
        return <AlertCircle size={12} />; 
      default:
        return null;
    } 
  }; 
 
  const getStatusColor = (status: RequestStatus) => { 
    switch (status.tag) { 
      case 'Pending': 
        return 'bg-yellow-100 text-yellow-800'; 
      case 'InProgress': 
        return 'bg-blue-100 text-blue-800'; 
      case 'Completed': 
        return 'bg-green-100 text-green-800'; 
      case 'Cancelled': 
        return 'bg-red-100 text-red-800'; 
      default:
        return 'bg-gray-100 text-gray-800';
    } 
  }; 
 
 
   // Using the filtered requests defined earlier
 
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col bg-indigo-800 text-white w-64 transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">DIYAMA Admin</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-700">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`} 
               onClick={() => setActiveTab('dashboard')}>
            <Home size={20} />
            <span className="ml-3">Dashboard</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'exchanges' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('exchanges')}>
            <ArrowRightLeft size={20} />
            <span className="ml-3">Exchanges</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('users')}>
            <Users size={20} />
            <span className="ml-3">Users</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'admins' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('admins')}>
            <Shield size={20} />
            <span className="ml-3">Admins</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('analytics')}>
            <BarChart2 size={20} />
            <span className="ml-3">Analytics</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'content' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('content')}>
            <FileText size={20} />
            <span className="ml-3">Content</span>
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </div>
          <div className="px-4 py-3 cursor-pointer flex items-center hover:bg-indigo-700 rounded-lg mt-auto">
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={toggleSidebar} />
          <div className="relative z-50 w-64 bg-indigo-800 text-white h-full p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-700">
                <Menu size={24} />
              </button>
            </div>
            <nav className="mt-4 space-y-1">
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`} 
                  onClick={() => { setActiveTab('dashboard'); toggleSidebar(); }}>
                <Home size={20} />
                <span className="ml-3">Dashboard</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'exchanges' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('exchanges'); toggleSidebar(); }}>
                <ArrowRightLeft size={20} />
                <span className="ml-3">Exchanges</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('users'); toggleSidebar(); }}>
                <Users size={20} />
                <span className="ml-3">Users</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'admins' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('admins'); toggleSidebar(); }}>
                <Shield size={20} />
                <span className="ml-3">Admins</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('analytics'); toggleSidebar(); }}>
                <BarChart2 size={20} />
                <span className="ml-3">Analytics</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'content' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('content'); toggleSidebar(); }}>
                <FileText size={20} />
                <span className="ml-3">Content</span>
              </div>
              <div className={`px-4 py-3 cursor-pointer flex items-center rounded-lg ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                  onClick={() => { setActiveTab('settings'); toggleSidebar(); }}>
                <Settings size={20} />
                <span className="ml-3">Settings</span>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header with branding */}
        <header className="brand-gradient text-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-indigo-700/60">
                <Menu size={22} />
              </button>
              <span className="font-semibold">DIYAMA Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-white/20 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Search className="absolute left-3 top-2.5 text-white/80" size={18} />
              </div>
              <button className="relative p-2 rounded-full hover:bg-white/10">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-400 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Total Users</h3>
                    <Users className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">1,254</p>
                  <p className="text-green-500 text-sm mt-2">+12% from last month</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Active Sessions</h3>
                    <User className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">423</p>
                  <p className="text-green-500 text-sm mt-2">+5% from last week</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <BarChart2 className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">$12,543</p>
                  <p className="text-red-500 text-sm mt-2">-2% from yesterday</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Pending Tasks</h3>
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">15</p>
                  <p className="text-gray-500 text-sm mt-2">3 urgent</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-medium">User #{item} performed an action</p>
                          <p className="text-sm text-gray-500">{item * 10} minutes ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Add New User
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Generate Report
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Update Content
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      System Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Users Management</h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold">All Users</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Add User
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                      { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
                      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
                      { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
                      { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
                    ].map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <User size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Analytics</h1>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-semibold mb-4">Performance Overview</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Analytics Chart Placeholder</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Content Management</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Blog Posts', count: 24 },
                  { title: 'Pages', count: 12 },
                  { title: 'Media Files', count: 145 },
                  { title: 'Categories', count: 8 },
                  { title: 'Tags', count: 32 },
                  { title: 'Comments', count: 217 },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-3xl font-bold">{item.count}</p>
                    <button className="mt-4 text-indigo-600 hover:text-indigo-800">Manage →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'exchanges' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Exchange Requests</h1>
                <Button onClick={getAllRequests} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Pending</h3>
                    <Clock className="text-yellow-500" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">{pendingRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">In Progress</h3>
                    <ArrowRightLeft className="text-blue-500" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">{inProgressRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Completed</h3>
                    <CheckCircle2 className="text-green-500" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">{completedRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Cancelled</h3>
                    <AlertCircle className="text-red-500" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">{cancelledRequests.length}</p>
                </div>
              </div>

              {/* Exchange Requests Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">All Exchange Requests</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {exchangeRequests.map((request) => (
                        <tr key={request.requestId.toString()}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{request.fullName || 'N/A'}</div>
                              <div className="text-sm text-gray-500">{request.userWalletAddress}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-gray-900">{request.usdcAmount} USDC</div>
                             <div className="text-sm text-gray-500">{request.kwachaAmount} MWK</div>
                           </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{request.phoneNumber || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1">{request.status.tag}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(request.createdAt.toDate()).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Request Management Modal */}
              {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold mb-4">Manage Exchange Request</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                        <p className="text-sm text-gray-900">{selectedRequest.fullName || selectedRequest.userWalletAddress}</p>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                         <p className="text-sm text-gray-900">{selectedRequest.usdcAmount} USDC → {selectedRequest.kwachaAmount} MWK</p>
                       </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-sm text-gray-900">{selectedRequest.phoneNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                        <p className="text-sm text-gray-900">{selectedRequest.status.tag}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={statusUpdateNotes}
                          onChange={(e) => setStatusUpdateNotes(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={3}
                          placeholder="Add notes for status update..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        {selectedRequest.status.tag === 'Pending' && (
                          <Button
                            onClick={() => updateRequestStatus(selectedRequest.requestId, { tag: 'InProgress' } as RequestStatus, statusUpdateNotes)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                          >
                            Start Processing
                          </Button>
                        )}
                        {selectedRequest.status.tag === 'InProgress' && (
                          <Button
                            onClick={() => updateRequestStatus(selectedRequest.requestId, { tag: 'Completed' } as RequestStatus, statusUpdateNotes)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={isLoading}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button
                          onClick={() => updateRequestStatus(selectedRequest.requestId, { tag: 'Cancelled' } as RequestStatus, statusUpdateNotes)}
                          variant="danger"
                          disabled={isLoading}
                        >
                          Cancel Request
                        </Button>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button
                          onClick={() => setSelectedRequest(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admins' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Admin Management</h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                  <h3 className="font-semibold">Admin Users</h3>
                  <Button
                    onClick={() => {
                      const identity = prompt('Enter identity to add as admin:');
                      if (identity) addAdmin(identity);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add Admin
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {adminUsers.map((admin, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Shield className="text-indigo-600 mr-3" size={20} />
                              <div className="text-sm font-medium text-gray-900">{admin.identity}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {admin.addedAt.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {admin.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                if (confirm('Are you sure you want to remove this admin?')) {
                                  // Implement remove admin functionality
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="DIYAMA Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="admin@diyama.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="darkMode" className="mr-2" />
                      <label htmlFor="darkMode" className="text-sm text-gray-700">Enable Dark Mode</label>
                    </div>
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}