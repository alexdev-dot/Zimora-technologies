'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';

export function AdminHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex min-h-[76px] items-center justify-between border-b border-[#e7e2d9] bg-[#fbfaf7] px-5 sm:px-8 dark:border-white/[0.08] dark:bg-[#151515]">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open navigation" aria-expanded={isSidebarOpen} onClick={() => setIsSidebarOpen(true)} className="flex size-10 items-center justify-center rounded-[10px] border border-[#ded8ce] text-[#242321] transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f] lg:hidden dark:border-white/[0.12] dark:text-white dark:hover:border-[#ff5a1f] dark:hover:text-[#ff8a5f]">
            <span aria-hidden="true" className="flex flex-col gap-1"><span className="h-px w-4 bg-current" /><span className="h-px w-4 bg-current" /><span className="h-px w-2.5 bg-current" /></span>
          </button>
          <div>
            <p className="font-[family-name:var(--font-zimora-code)] text-[9px] font-bold uppercase tracking-[0.2em] text-[#ff5a1f]">Zimora control room</p>
            <h1 className="mt-1 font-[family-name:var(--font-zimora-sans)] text-[22px] font-bold tracking-[-0.03em] text-[#242321] dark:text-white">Overview</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Notifications" className="relative flex size-10 items-center justify-center rounded-[10px] border border-[#ded8ce] text-[#6f6b62] transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f] dark:border-white/[0.12] dark:text-white/60 dark:hover:border-[#ff5a1f] dark:hover:text-[#ff8a5f]"><span aria-hidden="true" className="relative size-4 rounded-t-full border-[1.5px] border-current border-b-0"><span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" /></span><span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-[#ff5a1f]" /></button>
          <div className="hidden h-8 w-px bg-[#ded8ce] sm:block dark:bg-white/[0.1]" />
          <div className="flex items-center gap-3 border-l-0 pl-0 sm:border-l sm:border-[#ded8ce] sm:pl-3 dark:sm:border-white/[0.1]">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#ff5a1f] font-[family-name:var(--font-zimora-code)] text-[11px] font-bold text-white">ZT</div>
            <div className="hidden sm:block"><p className="text-[13px] font-bold text-[#242321] dark:text-white">Admin</p><p className="mt-0.5 text-[11px] text-[#a19c91] dark:text-white/35">Zimora Technologies</p></div>
          </div>
        </div>
      </header>

      {isSidebarOpen ? <div className="fixed inset-0 z-50 flex lg:hidden"><button type="button" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} className="absolute inset-0 bg-black/60" /><div className="relative h-full shadow-2xl"><AdminSidebar onNavigate={() => setIsSidebarOpen(false)} /></div></div> : null}
    </>
  );
}

export default AdminHeader;
