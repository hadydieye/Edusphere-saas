import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  GraduationCap,
  School,
  BookOpen,
  Users,
  BookMarked,
  UserCheck,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ecole } from "@/lib/data";

const navItems = [
  { title: "École", url: "/dashboard", icon: School },
  { title: "Classes", url: "/dashboard/classes", icon: BookOpen },
  { title: "Élèves", url: "/dashboard/eleves", icon: Users },
  { title: "Matières", url: "/dashboard/matieres", icon: BookMarked },
  { title: "Professeurs", url: "/dashboard/professeurs", icon: UserCheck },
  { title: "Bulletins", url: "/dashboard/bulletins", icon: FileText },
  { title: "Notes", url: "/dashboard/notes", icon: BookMarked },
  { title: "Paramètres", url: "/dashboard/parametres", icon: Settings },
];

function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (url: string) =>
    url === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-heading font-bold text-sidebar-foreground text-sm truncate">Edusphère</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{ecole.nom}</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
              <LogOut className="h-4 w-4 mr-2" />
              {!collapsed && "Déconnexion"}
            </Button>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-card px-4 sticky top-0 z-30">
            <SidebarTrigger className="mr-4" />
            <h2 className="font-heading font-semibold text-foreground text-sm">{ecole.nom}</h2>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
