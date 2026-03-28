'use client';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica', fontSize: 11 },
  receiptBox: { border: 1, borderColor: '#000', padding: 20 },
  header: { borderBottom: 1, paddingBottom: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginBottom: 10 },
  label: { width: 120, color: '#666' },
  value: { flex: 1, fontWeight: 'bold' },
  amountBox: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', textAlign: 'center' },
  amount: { fontSize: 18, fontWeight: 'bold' },
  footer: { marginTop: 40, textAlign: 'right' }
});

export default function PaymentReceiptPDF({ payment, school }: any) {
  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.receiptBox}>
          <View style={styles.header}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{school.name}</Text>
              <Text>{school.address?.city || ''}</Text>
            </View>
            <Text style={styles.title}>REÇU DE PAIEMENT</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>N° Reçu :</Text>
            <Text style={styles.value}>RC-{payment.id.split('-')[0].toUpperCase()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date :</Text>
            <Text style={styles.value}>{new Date(payment.paid_at || payment.created_at).toLocaleDateString('fr-FR')}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Élève :</Text>
            <Text style={styles.value}>{payment.students?.last_name} {payment.students?.first_name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Motif :</Text>
            <Text style={styles.value}>{payment.label}</Text>
          </View>

          <View style={styles.amountBox}>
            <Text style={{ fontSize: 10 }}>MONTANT PAYÉ</Text>
            <Text style={styles.amount}>{payment.amount.toLocaleString('fr-FR')} GNF</Text>
          </View>

          <View style={styles.footer}>
            <Text>Le Caissier / Cachet</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
