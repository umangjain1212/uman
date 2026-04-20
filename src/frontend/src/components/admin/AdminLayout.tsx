import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAdmin } from "@/hooks/useAdmin";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  BarChart3,
  Bell,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Percent,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/coupons", label: "Coupons", icon: Percent },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarContentProps {
  currentPath: string;
  onClose?: () => void;
}

function SidebarContent({ currentPath, onClose }: SidebarContentProps) {
  const { logout, isLoading } = useAdmin();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-col h-full admin-sidebar">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-primary-foreground/20 flex items-center justify-between">
        <div>
          <span
            className="font-serif text-xl font-semibold tracking-widest text-primary-foreground select-none"
            style={{ letterSpacing: "0.18em" }}
          >
            Farm&nbsp;72
          </span>
          <p className="text-[11px] text-primary-foreground/60 mt-0.5 tracking-wide uppercase">
            Admin Panel
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 py-4 space-y-0.5 px-2"
        aria-label="Admin navigation"
      >
        {navItems.map((item) => {
          const active =
            currentPath === item.to ||
            (item.to !== "/admin/dashboard" && currentPath.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`admin-sidebar-item rounded-lg mx-0 ${active ? "admin-sidebar-item-active" : ""}`}
              data-ocid={`admin-nav-${item.label.toLowerCase()}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom area */}
      <div className="px-4 py-3 border-t border-primary-foreground/20">
        <div className="flex items-center gap-2 px-2 py-2 text-xs text-primary-foreground/50">
          <BarChart3 className="w-3 h-3" />
          <span>Farm72 Admin v1.0</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut || isLoading}
          className="admin-sidebar-item rounded-lg w-full text-primary-foreground/80 hover:text-primary-foreground mt-1 disabled:opacity-60 disabled:cursor-not-allowed transition-smooth"
          data-ocid="admin-sidebar-logout"
        >
          {loggingOut ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string[];
}

export function AdminLayout({ children, title, breadcrumb }: AdminLayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAdmin();
  const navigate = useNavigate();

  // Redirect to login if not authenticated (and not still loading)
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // While redirect is in-flight (navigate is async), show spinner instead of null
  // to prevent any flash of admin content.
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0">
        <SidebarContent currentPath={currentPath} />
      </aside>

      {/* Mobile sidebar via Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-0">
          <SidebarContent
            currentPath={currentPath}
            onClose={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="admin-header">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open navigation"
                  data-ocid="admin-mobile-menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
            </Sheet>

            {/* Title + Breadcrumb */}
            <div className="min-w-0">
              {breadcrumb && breadcrumb.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-foreground transition-smooth"
                  >
                    Admin
                  </Link>
                  {breadcrumb.map((crumb, i) => (
                    <span key={crumb} className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      <span
                        className={
                          i === breadcrumb.length - 1 ? "text-foreground" : ""
                        }
                      >
                        {crumb}
                      </span>
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display font-bold text-lg text-foreground truncate">
                {title}
              </h1>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              data-ocid="admin-notifications"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex text-xs gap-1.5"
              >
                View Site
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content flex-1">{children}</main>
      </div>
    </div>
  );
}
