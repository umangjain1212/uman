import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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
      className={`sticky top-0 z-50 bg-card transition-smooth ${
        scrolled ? "shadow-card border-b border-border" : "shadow-subtle"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group"
          data-ocid="nav-logo"
          aria-label="Farm72 Home"
        >
          <img
            src="/assets/images/logo.png"
            alt="Farm72"
            className="h-12 w-auto object-contain transition-smooth group-hover:opacity-90 drop-shadow-sm"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link px-4 py-2 rounded-lg hover:bg-muted ${
                currentPath === link.to ? "nav-link-active bg-primary/8" : ""
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
              className="relative hover:bg-primary/10 hover:text-primary transition-smooth"
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
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
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
        <div className="md:hidden border-t border-border bg-card animate-slide-up">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-muted text-foreground"
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
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "farm72";

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-primary-foreground/20">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/logo.png"
                alt="Farm72"
                className="h-14 w-auto object-contain brightness-0 invert opacity-90"
              />
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
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-primary-foreground transition-smooth"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91-9876543210
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>
            © {year} Farm72. All rights reserved. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                hostname,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary-foreground transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              onClick={(e) => e.preventDefault()}
              className="hover:text-primary-foreground transition-smooth"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => e.preventDefault()}
              className="hover:text-primary-foreground transition-smooth"
            >
              Terms of Service
            </a>
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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
}
