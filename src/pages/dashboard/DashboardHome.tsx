import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, UserCheck, TrendingUp, Activity } from "lucide-react";
import { eleves, classes, activites } from "@/lib/data";

const stats = [
  {
    label: "Total élèves",
    value: eleves.length.toString(),
    icon: Users,
    change: "+3 ce mois",
  },
  {
    label: "Classes",
    value: classes.length.toString(),
    icon: BookOpen,
    change: "3 niveaux",
  },
  {
    label: "Professeurs",
    value: "3",
    icon: UserCheck,
    change: "Tous actifs",
  },
  {
    label: "Moyenne générale",
    value: (eleves.reduce((s, e) => s + e.moyenne, 0) / eleves.length).toFixed(1),
    icon: TrendingUp,
    change: "+0.5 vs trimestre 1",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble de votre établissement</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-heading text-3xl font-bold text-foreground mt-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activites.map((a) => (
              <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.user} · {a.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
