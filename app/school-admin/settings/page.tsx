import { getSchoolProfile } from '@/lib/actions/school-admin';
import SchoolSettingsForm from '@/components/school-admin/SettingsForm';

export default async function SettingsPage() {
  const school = await getSchoolProfile();

  return <SchoolSettingsForm school={school} />;
}
