import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classes, eleves } from "@/lib/data";
import { Plus, ArrowLeft, Users } from "lucide-react";

export default function ClassesPage() {
  const [selectedClasseId, setSelectedClasseId] = useState<string | null>(null);

  const selectedClasse = classes.find((c) => c.id === selectedClasseId);
  const classEleves = eleves.filter((e) => e.classeId === selectedClasseId);

  if (selectedClasse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedClasseId(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{selectedClasse.nom}</h1>
            <p className="text-muted-foreground text-sm">
              {selectedClasse.niveau} · Prof. principal : {selectedClasse.professeurPrincipal}
            </p>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Élèves ({classEleves.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classEleves.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.nom}</TableCell>
                    <TableCell>{e.prenom}</TableCell>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez les classes de votre établissement</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle classe
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Classe</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Nb élèves</TableHead>
                <TableHead>Prof. principal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedClasseId(c.id)}
                >
                  <TableCell className="font-medium">{c.nom}</TableCell>
                  <TableCell>{c.niveau}</TableCell>
                  <TableCell>{c.nbEleves}</TableCell>
                  <TableCell>{c.professeurPrincipal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
