import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { classes, eleves, matieres, ecole } from "@/lib/data";
import { Download, GraduationCap, FileText } from "lucide-react";

export default function BulletinsPage() {
  const [classeId, setClasseId] = useState(classes[0].id);
  const [eleveId, setEleveId] = useState("");

  const classEleves = eleves.filter((e) => e.classeId === classeId);
  const selectedEleve = eleves.find((e) => e.id === eleveId);
  const selectedClasse = classes.find((c) => c.id === classeId);

  // Calculate weighted average and rank
  const getWeightedAverage = (notes: Record<string, number>) => {
    let totalWeighted = 0;
    let totalCoeff = 0;
    matieres.forEach((m) => {
      const note = notes[m.id] ?? 0;
      totalWeighted += note * m.coefficient;
      totalCoeff += m.coefficient;
    });
    return totalCoeff > 0 ? totalWeighted / totalCoeff : 0;
  };

  const rankings = classEleves
    .map((e) => ({ id: e.id, avg: getWeightedAverage(e.notes) }))
    .sort((a, b) => b.avg - a.avg);

  const eleveRank = rankings.findIndex((r) => r.id === eleveId) + 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Bulletins scolaires</h1>
        <p className="text-muted-foreground text-sm mt-1">Générez et consultez les bulletins</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-2 min-w-[200px]">
          <Label>Classe</Label>
          <Select value={classeId} onValueChange={(v) => { setClasseId(v); setEleveId(""); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 min-w-[200px]">
          <Label>Élève</Label>
          <Select value={eleveId} onValueChange={setEleveId}>
            <SelectTrigger><SelectValue placeholder="Choisir un élève" /></SelectTrigger>
            <SelectContent>
              {classEleves.map((e) => (
                <SelectItem key={e.id} value={e.id}>{e.prenom} {e.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedEleve && (
        <Card className="shadow-elevated max-w-2xl" id="bulletin">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">{ecole.nom}</h2>
              <p className="text-muted-foreground text-sm">{ecole.ville}, {ecole.pays}</p>
              <Separator className="my-4" />
              <h3 className="font-heading text-lg font-semibold text-primary">BULLETIN DE NOTES</h3>
              <p className="text-sm text-muted-foreground">Trimestre 1 — Année scolaire 2024-2025</p>
            </div>

            {/* Student Info */}
            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Élève : </span>
                  <span className="font-semibold">{selectedEleve.prenom} {selectedEleve.nom}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Classe : </span>
                  <span className="font-semibold">{selectedClasse?.nom}</span>
                </div>
              </div>
            </div>

            {/* Grades Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matière</TableHead>
                  <TableHead className="text-center">Note / 20</TableHead>
                  <TableHead className="text-center">Coeff.</TableHead>
                  <TableHead className="text-center">Note pondérée</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matieres.map((m) => {
                  const note = selectedEleve.notes[m.id] ?? 0;
                  return (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.nom}</TableCell>
                      <TableCell className="text-center">{note}</TableCell>
                      <TableCell className="text-center">{m.coefficient}</TableCell>
                      <TableCell className="text-center font-semibold">{(note * m.coefficient).toFixed(1)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            {/* Summary */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Moyenne générale pondérée</p>
                <p className="font-heading text-2xl font-bold text-primary">
                  {getWeightedAverage(selectedEleve.notes).toFixed(2)} / 20
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Rang</p>
                <p className="font-heading text-2xl font-bold text-foreground">
                  {eleveRank}<sup>e</sup> / {classEleves.length}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedEleve && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">Sélectionnez un élève pour afficher son bulletin</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
