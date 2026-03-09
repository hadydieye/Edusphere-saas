import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Home, BookOpen, FileText, User, Download, GraduationCap, TrendingUp } from "lucide-react";
import { eleves, matieres, ecole } from "@/lib/data";

const childEleve = eleves[0]; // Mamadou Camara

const tabs = [
  { id: "accueil", label: "Accueil", icon: Home },
  { id: "notes", label: "Notes", icon: BookOpen },
  { id: "bulletin", label: "Bulletin", icon: FileText },
  { id: "profil", label: "Profil", icon: User },
];

export default function ParentPage() {
  const [activeTab, setActiveTab] = useState("accueil");

  const getWeightedAverage = () => {
    let totalWeighted = 0;
    let totalCoeff = 0;
    matieres.forEach((m) => {
      const note = childEleve.notes[m.id] ?? 0;
      totalWeighted += note * m.coefficient;
      totalCoeff += m.coefficient;
    });
    return totalCoeff > 0 ? totalWeighted / totalCoeff : 0;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="font-heading font-bold text-sm">Edusphère</p>
          <p className="text-xs opacity-80">Espace Parent</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 pb-20 overflow-auto">
        {activeTab === "accueil" && (
          <div className="space-y-4">
            <Card className="shadow-card border-0 bg-primary text-primary-foreground">
              <CardContent className="p-5">
                <p className="text-sm opacity-80">Votre enfant</p>
                <p className="font-heading text-xl font-bold mt-1">{childEleve.prenom} {childEleve.nom}</p>
                <p className="text-sm opacity-80 mt-1">{childEleve.classe} · {ecole.nom}</p>
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-heading text-2xl font-bold">{getWeightedAverage().toFixed(1)}</span>
                  <span className="text-sm opacity-80">/ 20 moyenne générale</span>
                </div>
              </CardContent>
            </Card>

            <h3 className="font-heading font-semibold text-foreground">Notes récentes</h3>
            {matieres.slice(0, 3).map((m) => {
              const note = childEleve.notes[m.id] ?? 0;
              return (
                <Card key={m.id} className="shadow-card">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground">{m.nom}</p>
                      <p className="text-xs text-muted-foreground">Coeff. {m.coefficient}</p>
                    </div>
                    <span className={`font-heading text-lg font-bold ${note >= 10 ? "text-foreground" : "text-destructive"}`}>
                      {note}/20
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">Notes — Trimestre 1</h2>
            {matieres.map((m) => {
              const note = childEleve.notes[m.id] ?? 0;
              return (
                <Card key={m.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-sm text-foreground">{m.nom}</p>
                      <span className={`font-heading text-lg font-bold ${note >= 10 ? "text-foreground" : "text-destructive"}`}>
                        {note}/20
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(note / 20) * 100}%` }} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === "bulletin" && (
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">Bulletin scolaire</h2>
            <Card className="shadow-card">
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Matière</TableHead>
                      <TableHead className="text-xs text-center">Note</TableHead>
                      <TableHead className="text-xs text-center">Coeff.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matieres.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="text-sm">{m.nom}</TableCell>
                        <TableCell className="text-center text-sm font-semibold">{childEleve.notes[m.id]}</TableCell>
                        <TableCell className="text-center text-sm">{m.coefficient}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Moyenne pondérée</span>
                  <span className="font-heading text-xl font-bold text-primary">{getWeightedAverage().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full" onClick={() => window.print()}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger le bulletin PDF
            </Button>
          </div>
        )}

        {activeTab === "profil" && (
          <div className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">Profil</h2>
            <Card className="shadow-card">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nom</span>
                  <span className="text-sm font-medium">{childEleve.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prénom</span>
                  <span className="text-sm font-medium">{childEleve.prenom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Classe</span>
                  <span className="text-sm font-medium">{childEleve.classe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">École</span>
                  <span className="text-sm font-medium">{ecole.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statut</span>
                  <Badge variant="default">{childEleve.statut}</Badge>
                </div>
              </CardContent>
            </Card>
            <Link to="/">
              <Button variant="outline" className="w-full">Déconnexion</Button>
            </Link>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs gap-1 transition-colors ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
