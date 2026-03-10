import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { matieres as initialMatieres, type Matiere } from "@/lib/data";
import { Plus, Pencil, Trash2, BookMarked } from "lucide-react";
import { toast } from "sonner";

export default function MatieresPage() {
  const [matieres, setMatieres] = useState<Matiere[]>(initialMatieres);
  const [editingMatiere, setEditingMatiere] = useState<Matiere | null>(null);
  const [nom, setNom] = useState("");
  const [coefficient, setCoefficient] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenNew = () => {
    setEditingMatiere(null);
    setNom("");
    setCoefficient(1);
    setDialogOpen(true);
  };

  const handleOpenEdit = (m: Matiere) => {
    setEditingMatiere(m);
    setNom(m.nom);
    setCoefficient(m.coefficient);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!nom.trim()) {
      toast.error("Le nom de la matière est requis");
      return;
    }
    if (editingMatiere) {
      setMatieres((prev) =>
        prev.map((m) => (m.id === editingMatiere.id ? { ...m, nom, coefficient } : m))
      );
      toast.success("Matière modifiée avec succès");
    } else {
      const newMatiere: Matiere = {
        id: `m${Date.now()}`,
        nom,
        coefficient,
      };
      setMatieres((prev) => [...prev, newMatiere]);
      toast.success("Matière ajoutée avec succès");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setMatieres((prev) => prev.filter((m) => m.id !== id));
    toast.success("Matière supprimée");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Matières</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez les matières et leurs coefficients</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle matière
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMatiere ? "Modifier la matière" : "Ajouter une matière"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nom de la matière</Label>
                <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: Mathématiques" />
              </div>
              <div className="space-y-2">
                <Label>Coefficient</Label>
                <Input type="number" min={1} max={10} value={coefficient} onChange={(e) => setCoefficient(parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button onClick={handleSave}>
                {editingMatiere ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matière</TableHead>
                <TableHead className="text-center">Coefficient</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matieres.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <BookMarked className="h-4 w-4 text-primary" />
                    {m.nom}
                  </TableCell>
                  <TableCell className="text-center">{m.coefficient}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(m)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {matieres.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Aucune matière enregistrée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
