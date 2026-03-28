'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  header: { marginBottom: 30, borderBottom: 1, borderBottomColor: '#eee', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  schoolName: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  title: { fontSize: 16, textAlign: 'center', marginVertical: 20, fontWeight: 'bold', textDecoration: 'underline' },
  infoSection: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
  infoBox: { width: '45%' },
  infoLabel: { color: '#64748b', marginBottom: 2 },
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tableColHeader: { backgroundColor: '#f8fafc', padding: 8, fontWeight: 'bold' },
  tableCol: { padding: 8 },
  subjectCol: { flex: 3 },
  scoreCol: { flex: 1, textAlign: 'center' },
  commentCol: { flex: 4 },
  footer: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBox: { width: 150, textAlign: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  averageRow: { backgroundColor: '#f1f5f9', fontWeight: 'bold' }
});

export default function BulletinPDF({ student, school, grades, period }: any) {
  const average = grades.length > 0 
    ? grades.reduce((acc: number, g: any) => acc + (Number(g.score) || 0), 0) / grades.length
    : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text>{school.address?.city || ''}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>EDUSPHERE</Text>
            <Text>Logiciel de gestion scolaire</Text>
          </View>
        </View>

        <Text style={styles.title}>BULLETIN DE NOTES - {period}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>ÉLÈVE</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{student.last_name} {student.first_name}</Text>
            <Text>Sexe : {student.gender || '—'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>CLASSE</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{student.classes?.name || '—'}</Text>
            <Text>Année Scolaire : 2025-2026</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableColHeader]}>
            <Text style={styles.subjectCol}>MATIÈRES</Text>
            <Text style={styles.scoreCol}>NOTE / 20</Text>
            <Text style={styles.commentCol}>APPRÉCIATIONS</Text>
          </View>
          {grades.map((g: any) => (
            <View key={g.id} style={styles.tableRow}>
              <Text style={styles.subjectCol}>{g.subjects?.name}</Text>
              <Text style={styles.scoreCol}>{g.score || '—'}</Text>
              <Text style={styles.commentCol}>{g.comment || '—'}</Text>
            </View>
          ))}
          <View style={[styles.tableRow, styles.averageRow]}>
            <Text style={styles.subjectCol}>MOYENNE GÉNÉRALE</Text>
            <Text style={styles.scoreCol}>{average.toFixed(2)}</Text>
            <Text style={styles.commentCol}></Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureBox}>
            <Text>Le Parent</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Le Chef d'établissement</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
