import SchoolAdminLayout from '@/components/school-admin/Layout';
import { getSchoolDashboard, getPendingPaymentsCount } from '@/lib/actions/school-admin';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [{ school }, overdueCount] = await Promise.all([
    getSchoolDashboard(),
    getPendingPaymentsCount()
  ]);
  return <SchoolAdminLayout school={school} overdueCount={overdueCount}>{children}</SchoolAdminLayout>;
}
