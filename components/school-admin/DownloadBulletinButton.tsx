'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import BulletinPDF from './BulletinPDF';

export default function DownloadBulletinButton({ student, school, grades, period }: any) {
  return (
    <PDFDownloadLink
      document={<BulletinPDF student={student} school={school} grades={grades} period={period} />}
      fileName={`bulletin_${student.last_name}_${period}.pdf`}
      className="bg-accent hover:bg-accent/90 text-white font-body text-sm font-medium px-4 py-2 rounded-xl transition-colors inline-block"
    >
      {({ loading }) => (loading ? 'Génération...' : '⬇ Télécharger PDF')}
    </PDFDownloadLink>
  );
}
