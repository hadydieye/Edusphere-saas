import SchoolAdminLayout from '@/components/school-admin/Layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SchoolAdminLayout>{children}</SchoolAdminLayout>;
}
