import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { classes, matieres, eleves as allEleves } from "@/lib/data";
import { Save, Check } from "lucide-react";
import { toast } from "sonner";

export default function NotesPage() {
  const [classeId, setClasseId] = useState(classes[0].id);
  const [matiereId, setMatiereId] = useState(matieres[0].id);
  const [saved, setSaved] = useState(false);

  const classEleves = allEleves.filter((e) => e.classeId === classeId);

  const [notes, setNotes] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    classEleves.forEach((e) => {
      init[e.id] = e.notes[matiereId] ?? 0;
    });
    return init;
  });

  // Reset notes when class or subject changes
  useMemo(() => {
    const init: Record<string, number> = {};
    const els = allEleves.filter((e) => e.classeId === classeId);
    els.forEach((e) => {
      init[e.id] = e.notes[matiereId] ?? 0;
    });
    setNotes(init);
    setSaved(false);
  }, [classeId, matiereId]);

  const moyenne = useMemo(() => {
    const vals = Object.values(notes);
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [notes]);

  const handleSave = () => {
    setSaved(true);
    toast.success("Notes enregistrées avec succès !");
  };

  const selectedClasse = classes.find((c) => c.id === classeId);
  const selectedMatiere = matieres.find((m) => m.id === matiereId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Saisie des notes</h1>
        <p className="text-muted-foreground text-sm mt-1">Sélectionnez une classe et une matière</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-2 min-w-[200px]">
          <Label>Classe</Label>
          <Select value={classeId} onValueChange={setClasseId}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 min-w-[200px]">
          <Label>Matière</Label>
          <Select value={matiereId} onValueChange={setMatiereId}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {matieres.map((m) => (
                <SelectItem key={m.id} value={m.id}>{m.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg">
            {selectedClasse?.nom} — {selectedMatiere?.nom}
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Moyenne : {moyenne.toFixed(1)}</Badge>
            {saved && (
              <Badge className="bg-success text-success-foreground">
                <Check className="h-3 w-3 mr-1" />
                Enregistré
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead className="w-32">Note / 20</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classEleves.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.nom}</TableCell>
                  <TableCell>{e.prenom}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      max={20}
                      step={0.5}
                      value={notes[e.id] ?? 0}
                      onChange={(ev) =>
                        setNotes((prev) => ({
                          ...prev,
                          [e.id]: Math.min(20, Math.max(0, parseFloat(ev.target.value) || 0)),
                        }))
                      }
                      className="w-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer les notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
