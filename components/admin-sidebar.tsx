'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavIconName = 'overview' | 'projects' | 'messages' | 'team' | 'settings' | 'help';

const primaryNavigation: { label: string; href: string; icon: NavIconName }[] = [
  { label: 'Overview', href: '/admin', icon: 'overview' },
  { label: 'Projects', href: '/admin/projects', icon: 'projects' },
  { label: 'Messages', href: '/admin/messages', icon: 'messages' },
  { label: 'Team', href: '/admin/team', icon: 'team' },
];

const secondaryNavigation: { label: string; href: string; icon: NavIconName }[] = [
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
  { label: 'Help center', href: '/admin/help', icon: 'help' },
];

function NavIcon({ name }: { name: NavIconName }) {
  const paths: Record<NavIconName, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    projects: <><path d="M4 7.5h16" /><path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="m8 12 2 2 4-4" /></>,
    messages: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.9-3.3A7.3 7.3 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M15 14.5a4.5 4.5 0 0 1 5 4.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.5v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.5h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.5v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-.9.8-1.8 1.2-1.8 2.8" /><path d="M12 17h.01" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" className="size-[18px]">{paths[name]}</svg>;
}

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[268px] shrink-0 flex-col border-r border-[#e8e4df] bg-white px-4 py-5 text-[#211d1a]">
      <Link href="/" onClick={onNavigate} className="group mb-10 flex items-center gap-3 px-3 after:hidden">
        <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#ff5a1f] shadow-[0_8px_24px_rgba(255,90,31,0.24)]">
          <img src="/images/Zimora.png" alt="Zimora Technologies" className="h-7 w-auto object-contain brightness-0 invert" />
        </span>
        <span>
          <span className="block font-[family-name:var(--font-zimora-sans)] text-[15px] font-bold tracking-[-0.02em]">Zimora</span>
          <span className="mt-0.5 block font-[family-name:var(--font-zimora-code)] text-[9px] uppercase tracking-[0.2em] text-[#8b8179]">Technologies</span>
        </span>
      </Link>

      <nav aria-label="Primary navigation" className="flex flex-col gap-1">
        <p className="mb-2 px-3 font-[family-name:var(--font-zimora-code)] text-[9px] font-bold uppercase tracking-[0.22em] text-[#ff7b4b]">Workspace</p>
        {primaryNavigation.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return <Link key={item.href} href={item.href} onClick={onNavigate} className={`group flex items-center gap-3 rounded-[10px] px-3 py-3 text-[13px] font-medium transition-colors after:hidden ${isActive ? 'bg-[#ff5a1f] text-white shadow-[0_8px_20px_rgba(255,90,31,0.18)]' : 'text-[#766d66] hover:bg-[#f8f4f0] hover:text-[#211d1a]'}`}><NavIcon name={item.icon} /><span>{item.label}</span>{isActive ? <span className="ml-auto size-1.5 rounded-full bg-white/80" /> : null}</Link>;
        })}
      </nav>

      <nav aria-label="Support navigation" className="mt-9 flex flex-col gap-1">
        <p className="mb-2 px-3 font-[family-name:var(--font-zimora-code)] text-[9px] font-bold uppercase tracking-[0.22em] text-[#a79d95]">Manage</p>
        {secondaryNavigation.map((item) => <Link key={item.href} href={item.href} onClick={onNavigate} className="group flex items-center gap-3 rounded-[10px] px-3 py-3 text-[13px] font-medium text-white/45 transition-colors after:hidden hover:bg-white/[0.06] hover:text-white"><NavIcon name={item.icon} /><span>{item.label}</span></Link>)}
      </nav>

    </aside>
  );
}

export default AdminSidebar;
