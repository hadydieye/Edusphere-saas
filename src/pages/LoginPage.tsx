import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy role assignment
    if (email.includes("admin")) {
      setRole("admin");
      setTimeout(() => navigate("/dashboard"), 800);
    } else if (email.includes("prof")) {
      setRole("professeur");
      setTimeout(() => navigate("/dashboard/notes"), 800);
    } else if (email.includes("parent")) {
      setRole("parent");
      setTimeout(() => navigate("/parent"), 800);
    } else {
      setRole("admin");
      setTimeout(() => navigate("/dashboard"), 800);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">Edusphère</span>
          </Link>
          <CardTitle className="font-heading text-xl">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@ecole.gn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          {role && (
            <div className="mt-4 p-3 rounded-lg bg-muted text-center">
              <p className="text-sm text-muted-foreground">Rôle détecté :</p>
              <p className="font-heading font-semibold text-foreground capitalize">{role}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-6">
            Astuce : utilisez "admin@", "prof@" ou "parent@" pour tester les rôles
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
