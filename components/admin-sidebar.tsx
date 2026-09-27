import Image from 'next/image';
import Link from 'next/link';
import { BarChart3, BriefcaseBusiness, ChartNoAxesCombined, FileText, LayoutDashboard, ReceiptText, Send, Users, type LucideIcon } from 'lucide-react';

const navItems: [LucideIcon, string, string][] = [
  [LayoutDashboard, 'Dashboard', '/dashboard'],
  [BriefcaseBusiness, 'Projects', '/projects'],
  [Users, 'Clients', '/clients'],
  [ChartNoAxesCombined, 'Services', '/services'],
  [Send, 'Leads', '/leads'],
  [ReceiptText, 'Invoices', '/invoices'],
  [FileText, 'Blogs', '/blog'],
  [BarChart3, 'Reports', '/reports'],
];

export function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={`dashboard-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="dash-brand-row"><Link className="dash-brand" href="/dashboard" aria-label="Zimora Technologies dashboard"><Image className="dash-brand-logo" src="/images/Zimora.png" alt="Zimora Technologies" width={172} height={88} priority /></Link></div>
      <div className="dash-nav-label">Workspace</div>
      <nav className="dash-nav" aria-label="Main navigation">
        {navItems.map(([Icon, label, href]) => <Link key={label} title={collapsed ? label : undefined} className={label === 'Dashboard' ? 'active' : ''} href={href}><Icon aria-hidden="true" /><span>{label}</span></Link>)}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
