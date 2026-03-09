import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { eleves, matieres } from "@/lib/data";
import { Plus, Search, ArrowLeft, BookOpen } from "lucide-react";

export default function ElevesPage() {
  const [search, setSearch] = useState("");
  const [selectedEleveId, setSelectedEleveId] = useState<string | null>(null);

  const filtered = eleves.filter(
    (e) =>
      e.nom.toLowerCase().includes(search.toLowerCase()) ||
      e.prenom.toLowerCase().includes(search.toLowerCase()) ||
      e.classe.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEleve = eleves.find((e) => e.id === selectedEleveId);

  if (selectedEleve) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedEleveId(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {selectedEleve.prenom} {selectedEleve.nom}
            </h1>
            <p className="text-muted-foreground text-sm">{selectedEleve.classe}</p>
          </div>
          <Badge variant={selectedEleve.statut === "actif" ? "default" : "secondary"} className="ml-auto">
            {selectedEleve.statut}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Nom complet</span>
                <span className="font-medium text-sm">{selectedEleve.prenom} {selectedEleve.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Classe</span>
                <span className="font-medium text-sm">{selectedEleve.classe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Moyenne générale</span>
                <span className={`font-bold text-sm ${selectedEleve.moyenne >= 10 ? "text-foreground" : "text-destructive"}`}>
                  {selectedEleve.moyenne.toFixed(1)} / 20
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Notes par matière
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matieres.map((m) => {
                  const note = selectedEleve.notes[m.id] ?? 0;
                  return (
                    <div key={m.id} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{m.nom}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(note / 20) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold w-10 text-right ${note >= 10 ? "text-foreground" : "text-destructive"}`}>
                          {note}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Élèves</h1>
          <p className="text-muted-foreground text-sm mt-1">{eleves.length} élèves inscrits</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter élève
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un élève..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Moyenne</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow
                  key={e.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedEleveId(e.id)}
                >
                  <TableCell className="font-medium">{e.nom}</TableCell>
                  <TableCell>{e.prenom}</TableCell>
                  <TableCell>{e.classe}</TableCell>
                  <TableCell>
                    <span className={e.moyenne >= 10 ? "text-foreground font-semibold" : "text-destructive font-semibold"}>
                      {e.moyenne.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={e.statut === "actif" ? "default" : "secondary"}>
                      {e.statut}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
