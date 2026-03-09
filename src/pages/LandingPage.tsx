import { GraduationCap, Users, ClipboardList, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Gestion des élèves",
    description: "Inscriptions, profils, suivi académique complet de chaque élève en quelques clics.",
  },
  {
    icon: ClipboardList,
    title: "Saisie des notes",
    description: "Interface intuitive pour les professeurs. Notes, moyennes et classements calculés automatiquement.",
  },
  {
    icon: GraduationCap,
    title: "Bulletins PDF",
    description: "Génération instantanée de bulletins scolaires professionnels, prêts à imprimer.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">Edusphère</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Démarrer</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              🇬🇳 Conçu pour la Guinée
            </Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-foreground leading-tight max-w-3xl mx-auto">
              La gestion scolaire{" "}
              <span className="text-primary">numérique</span>{" "}
              pour la Guinée
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Edusphère simplifie la gestion de votre école : élèves, notes, bulletins — tout en un seul endroit, accessible partout.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="text-base px-8 h-12">
                  Démarrer l'essai gratuit
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8 h-12">
                Voir la démo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Tout ce qu'il faut pour votre école
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Une plateforme complète, simple et efficace.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="h-full border-border shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Tarifs simples et transparents
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Choisissez le plan adapté à votre établissement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.nom} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className={`h-full relative ${tier.popular ? 'border-primary shadow-elevated ring-2 ring-primary/20' : 'border-border shadow-card'}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4">Populaire</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-heading text-xl">{tier.nom}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="font-heading text-4xl font-extrabold text-foreground">{tier.prix}</span>
                      <span className="text-muted-foreground ml-2 text-sm">{tier.periode}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mt-4">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/login">
                      <Button className="w-full mt-8" variant={tier.popular ? "default" : "outline"}>
                        Choisir ce plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">Edusphère</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Edusphère. La gestion scolaire numérique pour la Guinée.
          </p>
        </div>
      </footer>
    </div>
  );
}
