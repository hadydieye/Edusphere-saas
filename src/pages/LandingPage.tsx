import { GraduationCap, Users, ClipboardList, BookOpen, Shield, BarChart3, Check, ArrowRight, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/lib/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    icon: Users,
    title: "Gestion des élèves",
    description: "Inscriptions, profils, suivi académique complet de chaque élève en quelques clics.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: ClipboardList,
    title: "Saisie des notes",
    description: "Interface intuitive pour les professeurs. Notes, moyennes et classements automatiques.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: GraduationCap,
    title: "Bulletins PDF",
    description: "Génération instantanée de bulletins scolaires professionnels, prêts à imprimer.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: BarChart3,
    title: "Statistiques avancées",
    description: "Tableaux de bord en temps réel. Moyennes, tendances et performances à portée de main.",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: Shield,
    title: "Sécurité des données",
    description: "Données hébergées en toute sécurité avec des accès contrôlés par rôle.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: BookOpen,
    title: "Multi-établissements",
    description: "Gérez plusieurs écoles depuis un seul tableau de bord centralisé.",
    gradient: "from-sky-500 to-blue-400",
  },
];

const stats = [
  { value: "500+", label: "Écoles partenaires" },
  { value: "50K+", label: "Élèves gérés" },
  { value: "99.9%", label: "Disponibilité" },
  { value: "4.9/5", label: "Satisfaction" },
];

const testimonials = [
  {
    name: "M. Camara",
    role: "Directeur, Lycée Moderne de Conakry",
    text: "Edusphère a transformé la gestion de notre lycée. Les bulletins sont générés en un clic et les parents sont ravis.",
    avatar: "MC",
  },
  {
    name: "Mme Diallo",
    role: "Professeure, Collège de Kipé",
    text: "La saisie des notes est devenue un plaisir. L'interface est intuitive et je gagne un temps précieux.",
    avatar: "MD",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  const [billingPeriod] = useState<"annual" | "monthly">("annual");

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold">Edusphère</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Témoignages</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                Connexion
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-lg shadow-violet-600/25">
                Démarrer
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 md:py-36">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-8 px-5 py-2 text-sm font-medium bg-white/5 border-white/10 text-white/80 backdrop-blur-sm hover:bg-white/10">
                🇬🇳 Conçu pour les écoles guinéennes
              </Badge>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                La gestion{" "}
              </span>
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                scolaire
              </span>
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                {" "}numérique
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Edusphère simplifie la gestion de votre école : élèves, notes, bulletins — tout en un seul endroit, accessible partout.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="text-base px-8 h-13 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-xl shadow-violet-600/30 rounded-xl">
                  Démarrer l'essai gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8 h-13 bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl">
                Voir la démo
              </Button>
            </div>
          </motion.div>

          {/* Hero visual: glass dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-1 shadow-2xl shadow-violet-500/10">
              <div className="rounded-xl bg-gradient-to-br from-[#0f1629] to-[#151d35] p-6 md:p-8">
                {/* Mock top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  <span className="ml-4 text-xs text-white/30 font-mono">edusphere.app/dashboard</span>
                </div>
                {/* Mock stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Élèves inscrits", value: "1,247", color: "from-violet-500/20 to-violet-500/5" },
                    { label: "Classes actives", value: "42", color: "from-blue-500/20 to-blue-500/5" },
                    { label: "Moyenne générale", value: "13.8", color: "from-cyan-500/20 to-cyan-500/5" },
                    { label: "Bulletins générés", value: "3,891", color: "from-pink-500/20 to-pink-500/5" },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl bg-gradient-to-br ${stat.color} border border-white/5 p-4`}>
                      <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                      <p className="text-2xl font-heading font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Mock table */}
                <div className="mt-6 rounded-xl border border-white/5 overflow-hidden">
                  <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-white/[0.02] text-xs text-white/30 font-medium">
                    <span>Nom</span><span>Classe</span><span>Moyenne</span><span>Statut</span>
                  </div>
                  {["Camara Mamadou", "Diallo Fatoumata", "Barry Ibrahima"].map((name, i) => (
                    <div key={name} className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-white/5 text-sm">
                      <span className="text-white/70">{name}</span>
                      <span className="text-white/40">{["3ème A", "Seconde B", "Terminale C"][i]}</span>
                      <span className="text-white/70">{["14.5", "16.2", "11.8"][i]}</span>
                      <span className="text-emerald-400 text-xs">Actif</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative py-12 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-heading font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-violet-400 tracking-widest uppercase mb-4">
              Fonctionnalités
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-5xl font-bold text-white">
              Tout ce qu'il faut pour{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                votre école
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/40 text-lg max-w-xl mx-auto">
              Une plateforme complète, simple et efficace.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-default">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-violet-400 tracking-widest uppercase mb-4">
              Témoignages
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-5xl font-bold text-white">
              Ils nous font confiance
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="h-full rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-white/30 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-violet-400 tracking-widest uppercase mb-4">
              Tarifs
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-5xl font-bold text-white">
              Prêt à commencer ?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-white/40 text-lg">
              Choisissez le plan adapté à votre établissement.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => {
              const isPopular = tier.popular;
              const cardGradient = isPopular
                ? "from-violet-500/10 via-blue-500/10 to-cyan-500/10"
                : "from-white/[0.03] to-white/[0.01]";
              const borderColor = isPopular ? "border-violet-500/30" : "border-white/[0.06]";

              return (
                <motion.div
                  key={tier.nom}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <div className={`relative h-full rounded-2xl border ${borderColor} bg-gradient-to-br ${cardGradient} backdrop-blur-sm p-8 ${isPopular ? "ring-1 ring-violet-500/20 shadow-xl shadow-violet-500/10" : ""}`}>
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white border-0 px-4 shadow-lg shadow-violet-500/25">
                          Populaire
                        </Badge>
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="font-heading text-lg font-semibold text-white">{tier.nom}</h3>
                      <p className="text-white/30 text-sm mt-1">{tier.description}</p>
                      <div className="mt-5">
                        <span className="font-heading text-4xl font-extrabold text-white">{tier.prix}</span>
                        <span className="text-white/30 ml-2 text-sm">{tier.periode}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <div className="h-5 w-5 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-violet-400" />
                          </div>
                          <span className="text-white/60">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/login">
                      <Button
                        className={`w-full rounded-xl ${
                          isPopular
                            ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-lg shadow-violet-600/25"
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        }`}
                      >
                        Choisir ce plan
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-violet-600/10 via-blue-600/10 to-cyan-600/10 backdrop-blur-sm p-12 md:p-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à transformer votre école ?
              </h2>
              <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
                Rejoignez des centaines d'écoles guinéennes qui utilisent Edusphère pour simplifier leur gestion quotidienne.
              </p>
              <Link to="/login">
                <Button size="lg" className="text-base px-10 h-13 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-xl shadow-violet-600/30 rounded-xl">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-bold text-white">Edusphère</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/30">
              <a href="#features" className="hover:text-white/60 transition-colors">Fonctionnalités</a>
              <a href="#pricing" className="hover:text-white/60 transition-colors">Tarifs</a>
              <Link to="/login" className="hover:text-white/60 transition-colors">Connexion</Link>
            </div>
            <p className="text-white/20 text-sm">
              © 2024 Edusphère. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
