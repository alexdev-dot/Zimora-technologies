'use client';

import Image from 'next/image';

const projects: [string, string, string, string, string][] = [];

function StatCard({ icon, label, value, trend, tone }: { icon: string; label: string; value: string; trend: string; tone: string }) {
  const isPositive = parseFloat(trend) > 0;
  const trendIcon = isPositive ? '↑' : trend === '0%' ? '−' : '↓';
  const trendColor = isPositive ? 'text-green-500' : trend === '0%' ? 'text-gray-400' : 'text-red-500';

  return (
    <article className="dash-stat-card">
      <div className={`dash-icon ${tone}`}>{icon}</div>
      <div className="stat-content">
        <p className="dash-muted">{label}</p>
        <strong className="stat-value">{value}</strong>
        <div className="stat-trend">
          <span className={`trend-icon ${trendColor}`}>{trendIcon}</span>
          <span className={`trend-value ${trendColor}`}>{trend}</span>
          <small className="trend-label">vs last month</small>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="dashboard-main">
      <div className="dashboard-heading"><div><p>Welcome back,</p><h1>User <span>👋</span></h1><span>Here&apos;s what&apos;s happening with your business today.</span></div></div>
      <div className="dash-grid dash-stats"><StatCard icon="▣" label="Total Projects" value="0" trend="0%" tone="blue" /><StatCard icon="♧" label="Active Clients" value="0" trend="0%" tone="green" /><StatCard icon="$" label="Total Invoices" value="KSh 0" trend="0%" tone="purple" /><StatCard icon="◎" label="Leads" value="0" trend="0%" tone="orange" /></div>

      <div className="dashboard-columns">
        <div className="dashboard-left">
          <div className="dash-card revenue-card"><div className="dash-card-heading"><div><h2>Revenue Overview</h2><p>Monthly earnings from completed projects</p></div><button>Last 6 months⌄</button></div><div className="chart-wrap"><div className="chart-y"><span>200K</span><span>150K</span><span>100K</span><span>50K</span><span>0</span></div><div className="line-chart"><div className="chart-gridlines" /><svg viewBox="0 0 600 175" preserveAspectRatio="none" role="img" aria-label="Revenue line chart"><path d="M0 175 L600 175 L600 175 L0 175 Z" fill="url(#area)" /><path d="M0 175 L600 175" fill="none" stroke="#1285ef" strokeWidth="2.5" /><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#74b9ff" stopOpacity=".35"/><stop offset="1" stopColor="#74b9ff" stopOpacity=".02"/></linearGradient></defs></svg><div className="chart-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div></div></div>
          <div className="dash-card projects-card"><div className="dash-card-heading"><h2>Recent Projects</h2><a href="#projects">View all →</a></div><div className="project-table"><div className="project-row project-header"><span>Project</span><span>Client</span><span>Status</span><span>Deadline</span><span /></div>{projects.map(([name, client, status, deadline, image]) => <div className="project-row" key={name}><div className="project-name"><Image src={image} alt="" width={30} height={30} /><span>{name}</span></div><span>{client}</span><span><em className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</em></span><span>{deadline}</span><b>•••</b></div>)}</div></div>
        </div>
        <div className="dashboard-middle"><div className="dash-card status-card"><div className="dash-card-heading"><div><h2>Project Status</h2><p>Overview of all project statuses</p></div><a href="#projects">View all →</a></div><div className="donut-area"><div className="donut"><div className="donut-inner"><strong>0</strong><span>Total Projects</span></div></div></div><ul className="legend"><li className="legend-item"><i className="dot completed"/><span className="legend-label">Completed</span><b className="legend-count">0</b><span className="legend-percent">0%</span></li><li className="legend-item"><i className="dot progress"/><span className="legend-label">In Progress</span><b className="legend-count">0</b><span className="legend-percent">0%</span></li><li className="legend-item"><i className="dot hold"/><span className="legend-label">On Hold</span><b className="legend-count">0</b><span className="legend-percent">0%</span></li><li className="legend-item"><i className="dot planning"/><span className="legend-label">Planning</span><b className="legend-count">0</b><span className="legend-percent">0%</span></li></ul></div></div>
        <aside className="dashboard-right" />
        <div className="dash-card quick-card quick-actions-bottom"><h2>Quick Actions</h2><div className="quick-grid">{[['＋','Add New Project'],['♙','Add Client'],['▤','Create Invoice'],['◎','New Lead']].map(([icon, label]) => <button key={label}><span>{icon}</span>{label}</button>)}</div></div>
      </div>
    </div>
  );
}
