'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin-sidebar';

export function AdminHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex h-[76px] items-center justify-between border-b border-[#e8e4dc] bg-[#fbfaf7] px-5 sm:px-8 dark:border-white/[0.08] dark:bg-[#151616]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="flex size-10 items-center justify-center rounded-xl border border-[#e8e4dc] text-[#242321] transition-colors hover:bg-[#f1eee8] lg:hidden dark:border-white/[0.1] dark:text-white dark:hover:bg-white/[0.06]"
          >
            <span aria-hidden="true" className="text-lg">☰</span>
          </button>
          <div>
            <p className="font-[family-name:var(--font-zimora-code)] text-[10px] uppercase tracking-[0.18em] text-[#a19c91] dark:text-white/35">Workspace</p>
            <h1 className="mt-1 font-[family-name:var(--font-zimora-sans)] text-xl font-semibold tracking-tight text-[#242321] dark:text-white">Overview</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Notifications" className="flex size-10 items-center justify-center rounded-xl border border-[#e8e4dc] text-[#6f6b62] transition-colors hover:bg-[#f1eee8] dark:border-white/[0.1] dark:text-white/60 dark:hover:bg-white/[0.06]">
            <span aria-hidden="true" className="text-base">◌</span>
          </button>
          <div className="hidden h-8 w-px bg-[#e8e4dc] sm:block dark:bg-white/[0.1]" />
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#ff5a1f] font-[family-name:var(--font-zimora-code)] text-xs font-bold text-white">ZT</div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#242321] dark:text-white">Admin</p>
              <p className="text-xs text-[#a19c91] dark:text-white/35">Zimora Technologies</p>
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} className="absolute inset-0 bg-black/50" />
          <div className="relative h-full shadow-2xl">
            <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AdminHeader;

