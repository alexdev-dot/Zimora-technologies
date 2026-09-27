import Link from 'next/link';

const navItems = [
  ['⌂', 'Dashboard', '/dashboard'], ['▣', 'Projects', '/projects'], ['♧', 'Clients', '/clients'], ['⌘', 'Services', '/services'],
  ['⌁', 'Leads', '/leads'], ['▤', 'Invoices', '/invoices'], ['▧', 'Blogs', '/blog'], ['▥', 'Reports', '/reports'],
];

export function AdminSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="dash-brand"><div className="dash-brand-mark">Z</div><div><strong>Zimora Tech</strong><span>Build · Innovate · Grow</span></div></div>
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
