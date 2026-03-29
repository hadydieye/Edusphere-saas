'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import BulletinPDF from './BulletinPDF';
import { FileDown, Loader2 } from 'lucide-react';

interface BulletinButtonProps {
  student: any;
  school: any;
  grades: any[];
  period: string;
  rankData: any;
}

export default function BulletinButton({ student, school, grades, period, rankData }: BulletinButtonProps) {
  return (
    <PDFDownloadLink
      document={
        <BulletinPDF 
          student={student} 
          school={school} 
          grades={grades} 
          period={period} 
          rankData={rankData} 
        />
      }
      fileName={`Bulletin_${student.last_name}_${period}.pdf`}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileDown size={18} />
          )}
          Télécharger le Bulletin
        </button>
      )}
    </PDFDownloadLink>
  );
}
