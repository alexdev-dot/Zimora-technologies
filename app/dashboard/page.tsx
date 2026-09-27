'use client';

import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  ['⌂', 'Dashboard', '/dashboard'],
  ['▣', 'Projects', '/projects'],
  ['♧', 'Clients', '/clients'],
  ['⌘', 'Services', '/services'],
  ['⌁', 'Leads', '/leads'],
  ['▤', 'Invoices', '/invoices'],
  ['▧', 'Blogs', '/blog'],
  ['▥', 'Reports', '/reports'],
];

const projects = [
  ['Zimora POS (SaaS)', 'Zimora POS', 'In Progress', 'Oct 15, 2025', '/project-images/ShopEaseKenya.png'],
  ['Mukurinweini Technical Website', 'Mukurinweini Technical', 'Completed', 'Sep 20, 2025', '/project-images/Haven Homes.png'],
  ['Electroplanet Ruiru', 'Electroplanet', 'In Progress', 'Oct 5, 2025', '/project-images/Bite Flow.png'],
  ['Lynn Caris Palette', 'Lynn Caris', 'Planning', 'Oct 25, 2025', '/project-images/Groomers.png'],
  ['JCM Church Website', 'JCM Church', 'Completed', 'Sep 12, 2025', '/project-images/Zetech-event system.png'],
];

function StatCard({ icon, label, value, trend, tone }: { icon: string; label: string; value: string; trend: string; tone: string }) {
  return (
    <article className="dash-stat-card">
      <div className={`dash-icon ${tone}`}>{icon}</div>
      <div>
        <p className="dash-muted">{label}</p>
        <strong>{value}</strong>
        <p className="dash-trend">↑ {trend}</p>
        <small>vs last month</small>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dash-brand">
          <div className="dash-brand-mark">Z</div>
          <div><strong>Zimora Tech</strong><span>Build · Innovate · Grow</span></div>
        </div>
        <nav className="dash-nav" aria-label="Main navigation">
          {navItems.map(([icon, label, href]) => <Link key={label} className={label === 'Dashboard' ? 'active' : ''} href={href}><span>{icon}</span>{label}</Link>)}
        </nav>
        <p className="dash-section-label">SETTINGS</p>
        <nav className="dash-nav dash-settings">
          <button><span>♙</span>Team</button><button><span>⚙</span>Settings</button>
        </nav>
        <div className="dash-sidebar-promo">
          <div className="promo-art">⌁</div><strong>Let&apos;s build something great together!</strong><p>Turn your ideas into powerful digital solutions.</p><button>Get in Touch →</button>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div className="dash-search"><span>⌕</span><input aria-label="Search" placeholder="Search projects, clients, or anything..." /><kbd>⌘ K</kbd></div>
          <div className="dash-header-actions"><button className="dash-bell" aria-label="Notifications">♧<i>1</i></button><div className="dash-profile"><Image src="/images/CEO.png" alt="Alex Kariuki Macharia" width={38} height={38} /><div><strong>Alex Kariuki Macharia</strong><span>Administrator</span></div><b>⌄</b></div></div>
        </header>

        <div className="dashboard-main">
          <div className="dashboard-heading"><div><p>Welcome back,</p><h1>Alex Kariuki Macharia <span>👋</span></h1><span>Here&apos;s what&apos;s happening with your business today.</span></div><div className="dash-date">▣ <div><strong>Saturday, 27 September 2025</strong><small>Keep building. Great things take time.</small></div></div></div>
          <div className="dash-grid dash-stats"><StatCard icon="▣" label="Total Projects" value="12" trend="20%" tone="blue" /><StatCard icon="♧" label="Active Clients" value="8" trend="14%" tone="green" /><StatCard icon="$" label="Total Invoices" value="KSh 245,000" trend="32%" tone="purple" /><StatCard icon="◎" label="Leads" value="15" trend="25%" tone="orange" /></div>

          <div className="dashboard-columns">
            <div className="dashboard-left">
              <div className="dash-card revenue-card"><div className="dash-card-heading"><div><h2>Revenue Overview</h2><p>Monthly earnings from completed projects</p></div><button>Last 6 months⌄</button></div><div className="chart-wrap"><div className="chart-y"><span>200K</span><span>150K</span><span>100K</span><span>50K</span><span>0</span></div><div className="line-chart"><div className="chart-gridlines" /><svg viewBox="0 0 600 175" preserveAspectRatio="none" role="img" aria-label="Revenue line chart"><path d="M0 150 C70 130, 100 135, 125 132 S200 132, 250 128 S325 105, 375 102 S450 62, 500 58 S555 40, 600 25 L600 175 L0 175 Z" fill="url(#area)" /><path d="M0 150 C70 130, 100 135, 125 132 S200 132, 250 128 S325 105, 375 102 S450 62, 500 58 S555 40, 600 25" fill="none" stroke="#1285ef" strokeWidth="2.5" /><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#74b9ff" stopOpacity=".35"/><stop offset="1" stopColor="#74b9ff" stopOpacity=".02"/></linearGradient></defs></svg><div className="chart-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div></div></div>
              <div className="dash-card projects-card"><div className="dash-card-heading"><h2>Recent Projects</h2><a href="#projects">View all →</a></div><div className="project-table"><div className="project-row project-header"><span>Project</span><span>Client</span><span>Status</span><span>Deadline</span><span /></div>{projects.map(([name, client, status, deadline, image]) => <div className="project-row" key={name}><div className="project-name"><Image src={image} alt="" width={30} height={30} /><span>{name}</span></div><span>{client}</span><span><em className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</em></span><span>{deadline}</span><b>•••</b></div>)}</div></div>
            </div>
            <div className="dashboard-middle"><div className="dash-card status-card"><div className="dash-card-heading"><h2>Project Status</h2><a href="#projects">View all →</a></div><div className="donut-area"><div className="donut"><div><strong>12</strong><span>Total Projects</span></div></div></div><ul className="legend"><li><i className="dot completed"/>Completed <b>7</b><span>58%</span></li><li><i className="dot progress"/>In Progress <b>3</b><span>25%</span></li><li><i className="dot hold"/>On Hold <b>1</b><span>8%</span></li><li><i className="dot planning"/>Planning <b>1</b><span>8%</span></li></ul></div><div className="dash-card clients-card"><div className="dash-card-heading"><h2>Top Clients</h2><a href="#clients">View all →</a></div>{['Zimora POS','Mukurinweini Technical','Electroplanet Ruiru','Lynn Caris Palette','JCM Church'].map((client, i) => <div className="client-row" key={client}><div className={`client-avatar c${i}`}>{client[0]}</div><div><strong>{client}</strong><span>{['Business Software','Educational Website','E-commerce Website','E-commerce Website','Corporate Website'][i]}</span></div><em>Active</em></div>)}</div></div>
            <aside className="dashboard-right"><div className="dash-promo"><div><h2>Professional Web Solutions<br />for Kenyan Businesses</h2><p>Custom websites, e-commerce,<br />software & more.</p><button>View Our Services →</button></div><div className="laptop">Z</div></div><div className="dash-card quick-card"><h2>Quick Actions</h2><div className="quick-grid">{[['＋','Add New Project'],['♙','Add Client'],['▤','Create Invoice'],['◎','New Lead']].map(([icon, label]) => <button key={label}><span>{icon}</span>{label}</button>)}</div></div><div className="dash-card activity-card"><div className="dash-card-heading"><h2>Recent Activity</h2><a href="#activity">View all →</a></div>{['New lead from Electroplanet Ruiru','Invoice #INV-0245 paid','Project “Mukurinweini Technical Website” marked as completed','New client added','Blog post published'].map((item, i) => <div className="activity-row" key={item}><i className={`activity-icon a${i}`}>{['✦','▤','✓','♙','▣'][i]}</i><div><strong>{item}</strong><span>{['Website development inquiry','KSh 45,000 from Zimora POS','', 'Lynn Caris Palette','“5 Tips for a Successful Business Website”'][i]}</span><small>{['2 hours ago','4 hours ago','6 hours ago','8 hours ago','1 day ago'][i]}</small></div></div>)}</div></aside>
          </div>
        </div>
        <footer className="dashboard-footer"><span>© 2025 Zimora Tech. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Support</a></div></footer>
      </section>
    </main>
  );
}
