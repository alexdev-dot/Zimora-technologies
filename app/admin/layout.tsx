'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminHeader from '@/components/admin-header';
import AdminSidebar from '@/components/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // The login page renders its own full-screen layout without the admin chrome.
  const isLoginRoute = pathname === '/admin/login';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Body scroll lock when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  // Escape key handler to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    if (isMobileSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileSidebarOpen]);

  // Close the mobile sidebar automatically on route change.
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen((open) => !open);
    } else {
      setSidebarCollapsed((collapsed) => !collapsed);
    }
  };

  const handleMobileClose = () => {
    setIsMobileSidebarOpen(false);
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <main className="dashboard-shell">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileClose}
      />

      <section className="dashboard-content">
        <AdminHeader onToggleSidebar={handleToggleSidebar} isMobileSidebarOpen={isMobileSidebarOpen} />
        <div className="dashboard-main">{children}</div>
      </section>
    </main>
  );
}
