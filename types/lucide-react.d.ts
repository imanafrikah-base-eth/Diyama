declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  
  export type LucideIcon = ComponentType<LucideProps>;
  
  // Existing icons
  export const Menu: LucideIcon;
  export const Search: LucideIcon;
  export const User: LucideIcon;
  export const Bell: LucideIcon;
  export const BarChart2: LucideIcon;
  export const Users: LucideIcon;
  export const FileText: LucideIcon;
  export const Settings: LucideIcon;
  export const LogOut: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Edit: LucideIcon;
  export const Home: LucideIcon;
  export const ArrowRightLeft: LucideIcon;
  export const Phone: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Clock: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Shield: LucideIcon;
  export const UserPlus: LucideIcon;
  export const RefreshCw: LucideIcon;
  
  // Additional icons needed by the application
  export const BookOpen: LucideIcon;
  export const Instagram: LucideIcon;
  export const Youtube: LucideIcon;
  export const Twitter: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Zap: LucideIcon;
  export const Music: LucideIcon;
  export const Palette: LucideIcon;
  export const Video: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Wallet: LucideIcon;
  export const Globe: LucideIcon;
  export const Star: LucideIcon;
  export const Filter: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Award: LucideIcon;
  export const Coins: LucideIcon;
  export const GamepadIcon: LucideIcon;
  export const Heart: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const XCircle: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Banknote: LucideIcon;
  export const MapPin: LucideIcon;
  export const Calendar: LucideIcon;
  export const Newspaper: LucideIcon;
  export const Trophy: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Copy: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const ArrowDownLeft: LucideIcon;
  export const Sparkles: LucideIcon;
  export const ArrowRight: LucideIcon;
}