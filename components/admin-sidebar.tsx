'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ChartNoAxesCombined, FileText, FolderKanban, ImageIcon, LayoutDashboard, ReceiptText, Send, Settings, Users, X, type LucideIcon } from 'lucide-react';

type NavItem = { icon: LucideIcon; label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { label: 'Overview', items: [{ icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' }] },
  { label: 'Website', items: [{ icon: FolderKanban, label: 'Projects', href: '/admin/projects' }, { icon: Users, label: 'Clients', href: '/admin/clients' }, { icon: ChartNoAxesCombined, label: 'Services', href: '/admin/services' }, { icon: ImageIcon, label: 'Media', href: '/admin/media' }] },
  { label: 'Operations', items: [{ icon: Send, label: 'Leads', href: '/admin/leads' }, { icon: ReceiptText, label: 'Invoices', href: '/admin/invoices' }, { icon: BarChart3, label: 'Reports', href: '/admin/reports' }] },
  { label: 'Content', items: [{ icon: FileText, label: 'Blog', href: '/admin/blog' }] },
  { label: 'System', items: [{ icon: Settings, label: 'Settings', href: '/admin/settings' }] },
];

export function AdminSidebar({ collapsed, isMobile, isMobileOpen, onMobileClose }: { collapsed: boolean; isMobile: boolean; isMobileOpen?: boolean; onMobileClose?: () => void }) {
  const pathname = usePathname();

  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {isMobile && <div className={`dashboard-sidebar-overlay${isMobileOpen ? ' active' : ''}`} onClick={onMobileClose} aria-hidden="true" />}
      <aside 
        id="admin-sidebar"
        className={`dashboard-sidebar${collapsed && !isMobile ? ' collapsed' : ''}${isMobile && isMobileOpen ? ' mobile-open' : ''}`}
        aria-hidden={isMobile ? !isMobileOpen : undefined}
      >
        {isMobile && (
          <button 
            className="mobile-close-btn" 
            onClick={onMobileClose} 
            aria-label="Close sidebar"
            aria-controls="admin-sidebar"
          >
            <X aria-hidden="true" />
          </button>
        )}
        <div className="dash-brand-row">
          <Link className="dash-brand" href="/admin/dashboard" aria-label="Zimora Technologies admin panel" onClick={handleNavClick}>
            <Image className="dash-brand-logo" src="/images/Zimora.png" alt="Zimora Technologies" width={172} height={88} priority />
          </Link>
        </div>
        <nav className="dash-nav" aria-label="Admin navigation">
          {navGroups.map((group) => <div className="dash-nav-group" key={group.label}>
            <span className="dash-nav-label">{group.label}</span>
            {group.items.map(({ icon: Icon, label, href }) => {
              const active = pathname === href;
              return <Link key={href} title={collapsed ? label : undefined} className={active ? 'active' : ''} href={href} aria-current={active ? 'page' : undefined} onClick={handleNavClick}><Icon aria-hidden="true" /><span>{label}</span></Link>;
            })}
          </div>)}
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;
