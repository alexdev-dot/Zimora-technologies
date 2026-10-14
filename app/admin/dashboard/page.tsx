import type { Metadata } from 'next';
import DashboardContent from './dashboard-content';

export const metadata: Metadata = {
  title: 'Zimora Tech | Admin Dashboard',
  description: 'Admin dashboard for Zimora Technologies - manage projects, clients, services, and more.',
};

export default function Home() {
  return <DashboardContent />;
}
