'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
  header: { marginBottom: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottom: 2, borderBottomColor: '#CE1126' },
  headerBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, flexDirection: 'row' },
  barRed: { flex: 1, backgroundColor: '#CE1126' },
  barGold: { flex: 1, backgroundColor: '#FCD116' },
  barGreen: { flex: 1, backgroundColor: '#009460' },
  schoolName: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 2 },
  title: { fontSize: 16, textAlign: 'center', marginVertical: 15, fontWeight: 'bold', textTransform: 'uppercase', color: '#0f172a' },
  infoSection: { marginBottom: 20, flexDirection: 'row', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8 },
  infoBox: { flex: 1 },
  infoLabel: { color: '#64748b', fontSize: 8, marginBottom: 2, fontWeight: 'bold' },
  infoValue: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', alignItems: 'center', minHeight: 25 },
  tableColHeader: { backgroundColor: '#1e293b', color: 'white', fontWeight: 'bold' },
  tableCol: { padding: 6 },
  subjectCol: { flex: 4 },
  scoreCol: { flex: 1, textAlign: 'center' },
  coefCol: { flex: 1, textAlign: 'center' },
  totalCol: { flex: 1, textAlign: 'center' },
  commentCol: { flex: 3 },
  footer: { marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBox: { width: 140, textAlign: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  summarySection: { marginTop: 15, flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  summaryBox: { padding: 10, backgroundColor: '#f1f5f9', borderRadius: 4, minWidth: 100, textAlign: 'center' },
  summaryLabel: { fontSize: 8, color: '#64748b' },
  summaryValue: { fontSize: 12, fontWeight: 'bold', color: '#0f172a' }
});

export default function BulletinPDF({ student, school, grades, period, rankData }: any) {
  const average = grades.length > 0 
    ? grades.reduce((acc: number, g: any) => acc + (Number(g.score) || 0), 0) / grades.length
    : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Flag Bar */}
        <View style={styles.headerBar}>
          <View style={styles.barRed} />
          <View style={styles.barGold} />
          <View style={styles.barGreen} />
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={{ fontSize: 8 }}>{school.address?.city || 'Conakry, Guinée'}</Text>
            <Text style={{ fontSize: 8 }}>Tél: {school.phone || '—'}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#009460' }}>EDUSPHERE</Text>
            <Text style={{ fontSize: 7, color: '#64748b' }}>Système de Gestion Scolaire Numérique</Text>
          </View>
        </View>

        <Text style={styles.title}>Bulletin de Notes — {period}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>ÉLÈVE</Text>
            <Text style={styles.infoValue}>{student.last_name.toUpperCase()} {student.first_name}</Text>
            <Text style={{ fontSize: 8, marginTop: 4 }}>Sexe : {student.gender === 'M' ? 'Masculin' : 'Féminin'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>CLASSE</Text>
            <Text style={styles.infoValue}>{student.classes?.name || '—'}</Text>
            <Text style={{ fontSize: 8, marginTop: 4 }}>Année : 2025-2026</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableColHeader]}>
            <Text style={[styles.tableCol, styles.subjectCol]}>MATIÈRES</Text>
            <Text style={[styles.tableCol, styles.scoreCol]}>NOTE</Text>
            <Text style={[styles.tableCol, styles.coefCol]}>COEF</Text>
            <Text style={[styles.tableCol, styles.totalCol]}>TOTAL</Text>
            <Text style={[styles.tableCol, styles.commentCol]}>APPRÉCIATIONS</Text>
          </View>
          {grades.map((g: any) => (
            <View key={g.id} style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.subjectCol]}>{g.subjects?.name}</Text>
              <Text style={[styles.tableCol, styles.scoreCol]}>{g.score || '—'}</Text>
              <Text style={[styles.tableCol, styles.coefCol]}>1</Text>
              <Text style={[styles.tableCol, styles.totalCol]}>{g.score || '—'}</Text>
              <Text style={[styles.tableCol, styles.commentCol, { fontSize: 7, color: '#64748b' }]}>
                {g.comment || (g.score >= 10 ? 'Satisfaisant' : 'À renforcer')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>MOYENNE</Text>
            <Text style={styles.summaryValue}>{average.toFixed(2)}/20</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: '#e2f2e9' }]}>
            <Text style={styles.summaryLabel}>RANG</Text>
            <Text style={[styles.summaryValue, { color: '#009460' }]}>
              {rankData?.rank || '—'} / {rankData?.total || '—'}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureBox}>
            <Text style={styles.infoLabel}>OBSERVATION DU CHEF</Text>
            <Text style={{ fontSize: 8, marginTop: 10 }}>
              {average >= 10 ? 'Tableau d\'honneur' : 'Travail insuffisant'}
            </Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.infoLabel}>SIGNATURE ET CACHET</Text>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 20, left: 40, right: 40, borderTop: 1, borderTopColor: '#eee', paddingTop: 5 }}>
          <Text style={{ fontSize: 6, color: '#94a3b8', textAlign: 'center' }}>
            Document généré par Edusphère — La révolution numérique de l'éducation en Guinée.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
