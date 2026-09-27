import Image from 'next/image';

export function AdminHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="dashboard-header">
      <button className="sidebar-menu" onClick={onToggleSidebar} aria-label="Toggle admin sidebar">☰</button>
      <div className="dash-search"><span>⌕</span><input aria-label="Search" placeholder="Search projects, clients, or anything..." /><kbd>⌘ K</kbd></div>
      <div className="dash-header-actions"><button className="dash-bell" aria-label="Notifications">♧<i>1</i></button><div className="dash-profile"><Image src="/images/CEO.png" alt="Alex Kariuki Macharia" width={38} height={38} /><div><strong>Alex Kariuki Macharia</strong><span>Administrator</span></div><b>⌄</b></div></div>
    </header>
  );
}

export default AdminHeader;
