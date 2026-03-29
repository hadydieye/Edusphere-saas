'use client';

import { useEffect, useState } from 'react';
import { 
  getLatePayments, 
  sendBulkPaymentReminders,
  sendSMSNotification
} from '@/lib/actions/school-admin';
import { 
  Users, 
  AlertCircle, 
  Send, 
  Search,
  CheckCircle2,
  Phone,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function LatePaymentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadLatePayments();
  }, []);

  async function loadLatePayments() {
    setIsLoading(true);
    const data = await getLatePayments();
    setStudents(data);
    setIsLoading(false);
  }

  async function handleBulkReminder() {
    if (!confirm(`Voulez-vous envoyer un rappel SMS à ${students.length} parents ?`)) return;
    setIsSending(true);
    const msg = await sendBulkPaymentReminders(students.map(s => s.id));
    setMessage(msg);
    setIsSending(false);
    setTimeout(() => setMessage(null), 5000);
  }

  const filtered = students.filter(s => 
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/school-admin/payments" className="p-2 hover:bg-surface rounded-lg transition-colors border border-border">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-display text-text">Paiements en Retard</h1>
            <p className="text-sm text-muted">Élèves n'ayant pas encore réglé la scolarité du mois</p>
          </div>
        </div>

        <button 
          onClick={handleBulkReminder}
          disabled={isSending || students.length === 0}
          className="bg-danger text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-danger/90 transition-all shadow-lg shadow-danger/20 active:scale-95 disabled:opacity-50"
        >
          {isSending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : <Send size={18} />}
          Tout Relancer (SMS)
        </button>
      </div>

      {message && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3 text-primary animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={18} />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Stats Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center text-danger border border-danger/20">
          <Users size={32} />
        </div>
        <div>
          <p className="text-sm font-medium text-muted uppercase tracking-wider">Total Impayés</p>
          <p className="text-3xl font-bold font-display text-text">{students.length} Élèves</p>
        </div>
        <div className="flex-1" />
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text"
            placeholder="Rechercher un élève..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-accent outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/5 border-bottom border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-widest">Élève</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-widest">Classe</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-widest">Tuteur</th>
              <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted">
                  Chargement de la liste...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted">
                  Aucun impayé trouvé. Félicitations !
                </td>
              </tr>
            ) : filtered.map((student) => (
              <tr key={student.id} className="hover:bg-muted/5 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-sm text-text">{student.last_name} {student.first_name}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-bg border border-border px-3 py-1 rounded-full text-[11px] font-bold text-text uppercase italic">
                    {student.classes?.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted flex items-center gap-2">
                  <Phone size={14} className="opacity-50" />
                  {student.guardian_phone}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={async () => {
                      const msg = `Edusphère: Rappel de scolarité pour ${student.first_name}. Merci d'effectuer le règlement.`;
                      await sendSMSNotification(student.id, msg);
                      alert('Rappel envoyé !');
                    }}
                    className="p-2 hover:bg-danger/10 text-danger rounded-lg transition-colors border border-transparent hover:border-danger/20"
                    title="Envoyer un rappel individuel"
                  >
                    <Send size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
