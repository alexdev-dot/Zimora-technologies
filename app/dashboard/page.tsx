'use client';

import { useState } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/admin-header';
import AdminSidebar from '@/components/admin-sidebar';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="dashboard-shell">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />

      <section className="dashboard-content">
        <AdminHeader onToggleSidebar={() => setSidebarCollapsed((value) => !value)} />

        <div className="dashboard-main">
          <div className="dashboard-heading"><div><p>Welcome back,</p><h1>Alex Kariuki Macharia <span>👋</span></h1><span>Here&apos;s what&apos;s happening with your business today.</span></div><div className="dash-date">▣ <div><strong>Saturday, 27 September 2025</strong><small>Keep building. Great things take time.</small></div></div></div>
          <div className="dash-grid dash-stats"><StatCard icon="▣" label="Total Projects" value="12" trend="20%" tone="blue" /><StatCard icon="♧" label="Active Clients" value="8" trend="14%" tone="green" /><StatCard icon="$" label="Total Invoices" value="KSh 245,000" trend="32%" tone="purple" /><StatCard icon="◎" label="Leads" value="15" trend="25%" tone="orange" /></div>

          <div className="dashboard-columns">
            <div className="dashboard-left">
              <div className="dash-card revenue-card"><div className="dash-card-heading"><div><h2>Revenue Overview</h2><p>Monthly earnings from completed projects</p></div><button>Last 6 months⌄</button></div><div className="chart-wrap"><div className="chart-y"><span>200K</span><span>150K</span><span>100K</span><span>50K</span><span>0</span></div><div className="line-chart"><div className="chart-gridlines" /><svg viewBox="0 0 600 175" preserveAspectRatio="none" role="img" aria-label="Revenue line chart"><path d="M0 150 C70 130, 100 135, 125 132 S200 132, 250 128 S325 105, 375 102 S450 62, 500 58 S555 40, 600 25 L600 175 L0 175 Z" fill="url(#area)" /><path d="M0 150 C70 130, 100 135, 125 132 S200 132, 250 128 S325 105, 375 102 S450 62, 500 58 S555 40, 600 25" fill="none" stroke="#1285ef" strokeWidth="2.5" /><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#74b9ff" stopOpacity=".35"/><stop offset="1" stopColor="#74b9ff" stopOpacity=".02"/></linearGradient></defs></svg><div className="chart-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div></div></div>
              <div className="dash-card projects-card"><div className="dash-card-heading"><h2>Recent Projects</h2><a href="#projects">View all →</a></div><div className="project-table"><div className="project-row project-header"><span>Project</span><span>Client</span><span>Status</span><span>Deadline</span><span /></div>{projects.map(([name, client, status, deadline, image]) => <div className="project-row" key={name}><div className="project-name"><Image src={image} alt="" width={30} height={30} /><span>{name}</span></div><span>{client}</span><span><em className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</em></span><span>{deadline}</span><b>•••</b></div>)}</div></div>
            </div>
            <div className="dashboard-middle"><div className="dash-card status-card"><div className="dash-card-heading"><h2>Project Status</h2><a href="#projects">View all →</a></div><div className="donut-area"><div className="donut"><div><strong>12</strong><span>Total Projects</span></div></div></div><ul className="legend"><li><i className="dot completed"/>Completed <b>7</b><span>58%</span></li><li><i className="dot progress"/>In Progress <b>3</b><span>25%</span></li><li><i className="dot hold"/>On Hold <b>1</b><span>8%</span></li><li><i className="dot planning"/>Planning <b>1</b><span>8%</span></li></ul></div><div className="dash-card clients-card"><div className="dash-card-heading"><h2>Top Clients</h2><a href="#clients">View all →</a></div>{['Zimora POS','Mukurinweini Technical','Electroplanet Ruiru','Lynn Caris Palette','JCM Church'].map((client, i) => <div className="client-row" key={client}><div className={`client-avatar c${i}`}>{client[0]}</div><div><strong>{client}</strong><span>{['Business Software','Educational Website','E-commerce Website','E-commerce Website','Corporate Website'][i]}</span></div><em>Active</em></div>)}</div></div>
            <aside className="dashboard-right"><div className="dash-card quick-card"><h2>Quick Actions</h2><div className="quick-grid">{[['＋','Add New Project'],['♙','Add Client'],['▤','Create Invoice'],['◎','New Lead']].map(([icon, label]) => <button key={label}><span>{icon}</span>{label}</button>)}</div></div></aside>
          </div>
        </div>
        <footer className="dashboard-footer"><span>© 2025 Zimora Tech. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Support</a></div></footer>
      </section>
    </main>
  );
}
