'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryNavigation = [
  { label: 'Overview', href: '/admin', icon: '⌂' },
  { label: 'Projects', href: '/admin/projects', icon: '▦' },
  { label: 'Messages', href: '/admin/messages', icon: '◌' },
  { label: 'Team', href: '/admin/team', icon: '◎' },
];

const secondaryNavigation = [
  { label: 'Settings', href: '/admin/settings', icon: '⚙' },
  { label: 'Help center', href: '/admin/help', icon: '?' },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[252px] shrink-0 flex-col border-r border-white/8 bg-[#101113] px-4 py-5 text-white">
      <div className="flex items-center gap-3 px-3 pb-8">
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#ff5a1f] shadow-[0_0_24px_rgba(255,90,31,0.22)]">
          <img src="/images/Zimora.png" alt="Zimora Technologies" className="h-7 w-auto object-contain brightness-0 invert" />
        </div>
        <div>
          <p className="font-[family-name:var(--font-zimora-sans)] text-[15px] font-semibold tracking-tight">Zimora</p>
          <p className="font-[family-name:var(--font-zimora-code)] text-[10px] uppercase tracking-[0.18em] text-white/35">Admin portal</p>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="space-y-1">
        <p className="px-3 pb-2 font-[family-name:var(--font-zimora-code)] text-[10px] uppercase tracking-[0.18em] text-white/30">Workspace</p>
        {primaryNavigation.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors after:hidden ${isActive ? 'bg-[#ff5a1f] text-white shadow-[0_8px_24px_rgba(255,90,31,0.16)]' : 'text-white/48 hover:bg-white/6 hover:text-white'}`}>
              <span aria-hidden="true" className={`flex w-5 justify-center text-base ${isActive ? 'text-white' : 'text-white/45 group-hover:text-[#ff8a5f]'}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <nav aria-label="Support navigation" className="mt-8 space-y-1">
        <p className="px-3 pb-2 font-[family-name:var(--font-zimora-code)] text-[10px] uppercase tracking-[0.18em] text-white/30">Manage</p>
        {secondaryNavigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/48 transition-colors after:hidden hover:bg-white/6 hover:text-white">
            <span aria-hidden="true" className="flex w-5 justify-center text-base text-white/45 group-hover:text-[#ff8a5f]">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.035] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2 w-2 rounded-full bg-[#58d68d] shadow-[0_0_10px_rgba(88,214,141,0.7)]" />
          <span className="font-[family-name:var(--font-zimora-code)] text-[10px] uppercase tracking-[0.16em] text-white/35">System status</span>
        </div>
        <p className="text-sm font-medium text-white/80">All systems operational</p>
        <p className="mt-1 text-xs leading-5 text-white/35">Your admin workspace is ready.</p>
      </div>
    </aside>
  );
}

export default AdminSidebar;
