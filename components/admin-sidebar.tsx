'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BriefcaseBusiness, ChartNoAxesCombined, FileText, LayoutDashboard, ReceiptText, Send, Users, type LucideIcon } from 'lucide-react';

const navGroups: { label: string; items: [LucideIcon, string, string][] }[] = [
  { label: 'Overview', items: [[LayoutDashboard, 'Dashboard', '/dashboard']] },
  { label: 'Workspace', items: [[BriefcaseBusiness, 'Projects', '/projects'], [Users, 'Clients', '/clients'], [ChartNoAxesCombined, 'Services', '/services'], [Send, 'Leads', '/leads']] },
  { label: 'Business', items: [[ReceiptText, 'Invoices', '/invoices'], [BarChart3, 'Reports', '/reports']] },
  { label: 'Content', items: [[FileText, 'Blog', '/blog']] },
];

export function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`dashboard-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="dash-brand-row">
        <Link className="dash-brand" href="/dashboard" aria-label="Zimora Technologies admin panel">
          <Image className="dash-brand-logo" src="/images/Zimora.png" alt="Zimora Technologies" width={172} height={88} priority />
          <span className="dash-brand-panel">Admin Panel</span>
        </Link>
      </div>
      <nav className="dash-nav" aria-label="Main navigation">
        {navGroups.map((group) => <div className="dash-nav-group" key={group.label}>
          <span className="dash-nav-label">{group.label}</span>
          {group.items.map(([Icon, label, href]) => {
            const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
            return <Link key={label} title={collapsed ? label : undefined} className={active ? 'active' : ''} style={{ paddingLeft: 2, paddingRight: 6, gap: 8 }} href={href} aria-current={active ? 'page' : undefined}><Icon aria-hidden="true" /><span>{label}</span></Link>;
          })}
        </div>)}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
