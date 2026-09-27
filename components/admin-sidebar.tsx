'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ChartNoAxesCombined, FileText, FolderKanban, ImageIcon, LayoutDashboard, ReceiptText, Send, Settings, Users, type LucideIcon } from 'lucide-react';

type NavItem = { icon: LucideIcon; label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { label: 'Overview', items: [{ icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' }] },
  { label: 'Website', items: [{ icon: FolderKanban, label: 'Projects', href: '/projects' }, { icon: Users, label: 'Clients', href: '/clients' }, { icon: ChartNoAxesCombined, label: 'Services', href: '/services' }, { icon: ImageIcon, label: 'Media', href: '/media' }] },
  { label: 'Operations', items: [{ icon: Send, label: 'Leads', href: '/leads' }, { icon: ReceiptText, label: 'Invoices', href: '/invoices' }, { icon: BarChart3, label: 'Reports', href: '/reports' }] },
  { label: 'Content', items: [{ icon: FileText, label: 'Blog', href: '/blog' }] },
  { label: 'System', items: [{ icon: Settings, label: 'Settings', href: '/settings' }] },
];

export function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={`dashboard-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="dash-brand-row">
        <Link className="dash-brand" href="/dashboard" aria-label="Zimora Technologies admin panel">
          <Image className="dash-brand-logo" src="/images/Zimora.png" alt="Zimora Technologies" width={172} height={88} priority />
          <span className="dash-brand-panel">Admin Panel</span>
        </Link>
      </div>
      <nav className="dash-nav" aria-label="Admin navigation">
        {navGroups.map((group) => <div className="dash-nav-group" key={group.label}>
          <span className="dash-nav-label">{group.label}</span>
          {group.items.map(({ icon: Icon, label, href }) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
            return <Link key={href} title={collapsed ? label : undefined} className={active ? 'active' : ''} href={href} aria-current={active ? 'page' : undefined}><Icon aria-hidden="true" /><span>{label}</span></Link>;
          })}
        </div>)}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
