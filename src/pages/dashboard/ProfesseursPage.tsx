import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { classes, matieres } from "@/lib/data";

interface Professeur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  matiereId: string;
  classeIds: string[];
}

const initialProfesseurs: Professeur[] = [
  { id: "p1", nom: "Camara", prenom: "Moussa", email: "m.camara@edusphere.gn", telephone: "+224 620 00 01", matiereId: "m1", classeIds: ["c1"] },
  { id: "p2", nom: "Diallo", prenom: "Aïcha", email: "a.diallo@edusphere.gn", telephone: "+224 620 00 02", matiereId: "m2", classeIds: ["c2"] },
  { id: "p3", nom: "Bah", prenom: "Thierno", email: "t.bah@edusphere.gn", telephone: "+224 620 00 03", matiereId: "m3", classeIds: ["c3"] },
  { id: "p4", nom: "Sylla", prenom: "Fatoumata", email: "f.sylla@edusphere.gn", telephone: "+224 620 00 04", matiereId: "m4", classeIds: ["c1", "c2"] },
  { id: "p5", nom: "Keita", prenom: "Ibrahima", email: "i.keita@edusphere.gn", telephone: "+224 620 00 05", matiereId: "m5", classeIds: ["c1", "c2", "c3"] },
];

export default function ProfesseursPage() {
  const [professeurs, setProfesseurs] = useState<Professeur[]>(initialProfesseurs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Professeur | null>(null);
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", telephone: "", matiereId: matieres[0].id });

  const handleOpenNew = () => {
    setEditing(null);
    setForm({ nom: "", prenom: "", email: "", telephone: "", matiereId: matieres[0].id });
    setDialogOpen(true);
  };

  const handleOpenEdit = (p: Professeur) => {
    setEditing(p);
    setForm({ nom: p.nom, prenom: p.prenom, email: p.email, telephone: p.telephone, matiereId: p.matiereId });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.nom.trim() || !form.prenom.trim()) {
      toast.error("Nom et prénom sont requis");
      return;
    }
    if (editing) {
      setProfesseurs((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p))
      );
      toast.success("Professeur modifié avec succès");
    } else {
      setProfesseurs((prev) => [
        ...prev,
        { id: `p${Date.now()}`, ...form, classeIds: [] },
      ]);
      toast.success("Professeur ajouté avec succès");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProfesseurs((prev) => prev.filter((p) => p.id !== id));
    toast.success("Professeur supprimé");
  };

  const getMatiereName = (id: string) => matieres.find((m) => m.id === id)?.nom ?? "—";
  const getClasseNames = (ids: string[]) => ids.map((id) => classes.find((c) => c.id === id)?.nom).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Professeurs</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez le corps enseignant</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenNew}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau professeur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Modifier le professeur" : "Ajouter un professeur"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Matière enseignée</Label>
                <Select value={form.matiereId} onValueChange={(v) => setForm({ ...form, matiereId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {matieres.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button onClick={handleSave}>
                {editing ? "Enregistrer" : "Ajouter"}
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
                <TableHead>Nom</TableHead>
                <TableHead>Matière</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professeurs.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    {p.prenom} {p.nom}
                  </TableCell>
                  <TableCell>{getMatiereName(p.matiereId)}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell className="text-muted-foreground">{p.telephone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {getClasseNames(p.classeIds).map((name) => (
                        <Badge key={name} variant="secondary" className="text-xs">{name}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
