'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentReceiptPDF from './PaymentReceiptPDF';

export default function DownloadReceiptButton({ payment, school }: any) {
  return (
    <PDFDownloadLink
      document={<PaymentReceiptPDF payment={payment} school={school} />}
      fileName={`recu_${payment.id.split('-')[0]}.pdf`}
      className="text-accent hover:underline text-xs font-medium"
    >
      {({ loading }) => (loading ? '...' : 'Reçu PDF')}
    </PDFDownloadLink>
  );
}
