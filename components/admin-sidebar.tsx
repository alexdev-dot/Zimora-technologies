'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  ['⌂', 'Dashboard', '/dashboard'], ['▣', 'Projects', '/projects'], ['♧', 'Clients', '/clients'], ['⌘', 'Services', '/services'],
  ['⌁', 'Leads', '/leads'], ['▤', 'Invoices', '/invoices'], ['▧', 'Blogs', '/blog'], ['▥', 'Reports', '/reports'],
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`dashboard-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="dash-brand-row"><Link className="dash-brand" href="/dashboard" aria-label="Zimora Technologies dashboard"><Image className="dash-brand-logo" src="/images/Zimora.png" alt="Zimora Technologies" width={172} height={88} priority /></Link><button className="sidebar-collapse" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed}>{collapsed ? '›' : '‹'}</button></div>
      <nav className="dash-nav" aria-label="Main navigation">
        {navItems.map(([icon, label, href]) => <Link key={label} className={label === 'Dashboard' ? 'active' : ''} href={href}><span>{icon}</span>{label}</Link>)}
      </nav>
      <p className="dash-section-label">SETTINGS</p>
      <nav className="dash-nav dash-settings"><button><span>♙</span>Team</button><button><span>⚙</span>Settings</button></nav>
      <div className="dash-sidebar-promo"><div className="promo-art">⌁</div><strong>Let&apos;s build something great together!</strong><p>Turn your ideas into powerful digital solutions.</p><button>Get in Touch →</button></div>
    </aside>
  );
}

export default AdminSidebar;
