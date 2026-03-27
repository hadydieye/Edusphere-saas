import DashboardPage from '@/components/super-admin/DashboardPage';
import { getDashboardStats } from '@/lib/actions/audit';

export default async function AdminDashboardPage() {
  const { stats, chartData, recentSchools, recentAuditLogs } = await getDashboardStats();

  return (
    <DashboardPage
      stats={stats}
      chartData={chartData}
      recentSchools={recentSchools}
      recentAuditLogs={recentAuditLogs}
    />
  );
}
