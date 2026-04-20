import { createActor } from "@/backend";
import type { SiteSettings } from "@/backend.d";
import { WhatsAppPopup } from "@/components/WhatsAppPopup";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

function useSiteSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) throw new Error("actor not ready");
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000, // cache for 60 seconds to avoid re-fetch on every route change
  });
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/buransh", label: "Buransh Juice" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`sticky top-0 z-50 transition-smooth ${
        scrolled ? "shadow-card border-b border-border" : "shadow-subtle"
      }`}
      style={{ backgroundColor: "#1a3a1a" }}
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo + tagline */}
        <Link
          to="/"
          className="flex items-center group"
          data-ocid="nav-logo"
          aria-label="Farm72 Home"
        >
          <span
            className="font-serif text-2xl font-semibold tracking-widest text-white group-hover:text-white/90 transition-smooth select-none"
            style={{ letterSpacing: "0.18em" }}
          >
            Farm&nbsp;72
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                currentPath === link.to
                  ? "text-white bg-white/15"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              data-ocid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link to="/cart" data-ocid="nav-cart" aria-label="Shopping cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white/80 hover:text-white hover:bg-white/15 transition-smooth"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-badge-pop"
                  data-ocid="cart-badge"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-smooth"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t animate-slide-up"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            backgroundColor: "#1a3a1a",
          }}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                data-ocid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const { data: settings } = useSiteSettings();

  const footerText = settings?.footerText?.trim()
    ? settings.footerText
    : `© ${year} Farm72. All rights reserved.`;

  const whatsappNumber = settings?.whatsappNumber?.trim()
    ? settings.whatsappNumber.replace(/\D/g, "")
    : "917500010488";

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-primary-foreground/20">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="font-serif text-2xl font-semibold tracking-widest text-primary-foreground opacity-90 select-none"
                style={{ letterSpacing: "0.18em" }}
              >
                Farm&nbsp;72
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
              Bringing the goodness of nature to your kitchen using traditional
              Kacchi Ghani cold pressing methods.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-base">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
              <a
                href="mailto:info@farm72.in"
                className="flex items-center gap-2.5 hover:text-primary-foreground transition-smooth"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@farm72.in
              </a>
              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center gap-2.5 hover:text-primary-foreground transition-smooth"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />+{whatsappNumber}
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Farm72, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold text-base">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="hover:text-primary-foreground transition-smooth w-fit"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/cart"
                className="hover:text-primary-foreground transition-smooth w-fit"
              >
                Cart
              </Link>
              <Link
                to="/refund-policy"
                className="hover:text-primary-foreground transition-smooth w-fit"
              >
                Refund Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-foreground transition-smooth w-fit"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/faq"
                className="hover:text-primary-foreground transition-smooth w-fit"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>{footerText}</p>
          <div className="flex items-center gap-4">
            <Link
              to="/refund-policy"
              className="hover:text-primary-foreground transition-smooth"
            >
              Refund Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-primary-foreground transition-smooth"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: settings } = useSiteSettings();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Admin pages are never affected by maintenance mode
  const isAdminRoute = currentPath.startsWith("/admin");

  // Maintenance mode — show full-page notice for public routes only
  if (settings?.maintenanceMode && !isAdminRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔧</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Under Maintenance
          </h1>
          <p className="text-muted-foreground">
            We're temporarily down for maintenance. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement banner — public pages only, not admin */}
      {!isAdminRoute &&
        settings?.showAnnouncementBanner &&
        settings.announcementBannerText && (
          <div
            className="py-2 px-4 text-center text-sm font-medium text-white"
            style={{ backgroundColor: "#1a3a1a" }}
            data-ocid="announcement-banner"
          >
            {settings.announcementBannerText}
          </div>
        )}
      <Navbar />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
      <WhatsAppPopup />
    </div>
  );
}
