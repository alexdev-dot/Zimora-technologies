import type { ReactNode } from 'react';
import AdminHeader from '@/components/admin-header';
import AdminSidebar from '@/components/admin-sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#242321] dark:bg-[#0d0e0e] dark:text-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

