import { createActor } from "@/backend";
import type { SiteSettings, SiteSettingsInput } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Save, Settings, Shield, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "+91 7500010488",
  contactEmail: "info@farm72.in",
  footerText: "© 2026 Farm72. All rights reserved.",
  stripeEnabled: true,
  whatsappOrderEnabled: true,
  showAnnouncementBanner: false,
  announcementBannerText: "Free shipping on orders above ₹999!",
  maintenanceMode: false,
};

export function AdminSettings() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const {
    data: loadedSettings,
    isLoading,
    error,
  } = useQuery<SiteSettings>({
    queryKey: ["admin-site-settings"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getSiteSettings();
    },
    enabled,
  });

  useEffect(() => {
    if (loadedSettings) {
      setSettings(loadedSettings);
    }
  }, [loadedSettings]);

  const saveMutation = useMutation({
    mutationFn: async (input: SiteSettingsInput) => {
      if (!actor) throw new Error("No actor");
      console.log("[AdminSettings] updateSiteSettingsPartial:", input);
      const result = await actor.updateSiteSettingsPartial(input);
      if (result.__kind__ === "ok") return result.ok;
      throw new Error(result.err);
    },
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      toast.success("Settings saved successfully!");
    },
    onError: (err) => {
      console.error("[AdminSettings] save error:", err);
      toast.error("Failed to save settings");
    },
  });

  function setField<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveMutation.mutate(settings);
  }

  return (
    <AdminLayout title="Settings" breadcrumb={["Settings"]}>
      {error && (
        <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Could not load settings from backend. Showing defaults.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        {/* General */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle">
          <h2 className="font-display font-semibold text-base flex items-center gap-2 border-b border-border pb-3">
            <Settings className="w-4 h-4" />
            General Settings
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="admin-form-group">
                  <Label className="admin-form-label" htmlFor="footerText">
                    Footer Copyright Text
                  </Label>
                  <Input
                    id="footerText"
                    value={settings.footerText}
                    onChange={(e) => setField("footerText", e.target.value)}
                    data-ocid="admin-settings-footer-text-input"
                  />
                </div>
                <div className="admin-form-group">
                  <Label className="admin-form-label" htmlFor="contactEmail">
                    Support Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setField("contactEmail", e.target.value)}
                    data-ocid="admin-settings-support-email-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <Label
                  className="admin-form-label"
                  htmlFor="announcementBannerText"
                >
                  Announcement Banner Text
                </Label>
                <Input
                  id="announcementBannerText"
                  value={settings.announcementBannerText}
                  onChange={(e) =>
                    setField("announcementBannerText", e.target.value)
                  }
                  placeholder="e.g. Free shipping on orders above ₹999!"
                  data-ocid="admin-settings-announcement-input"
                />
              </div>

              <div className="flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg">
                <div>
                  <p className="text-sm font-medium">
                    Show Announcement Banner
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Display a banner across the top of the site
                  </p>
                </div>
                <Switch
                  checked={settings.showAnnouncementBanner}
                  onCheckedChange={(v) => setField("showAnnouncementBanner", v)}
                  data-ocid="admin-settings-banner-switch"
                />
              </div>
            </>
          )}
        </section>

        {/* Contact & Payments */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-subtle">
          <h2 className="font-display font-semibold text-base border-b border-border pb-3">
            Contact &amp; Payments
          </h2>

          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div className="admin-form-group">
              <Label className="admin-form-label" htmlFor="whatsapp">
                WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                value={settings.whatsappNumber}
                onChange={(e) => setField("whatsappNumber", e.target.value)}
                placeholder="+91 7500010488"
                data-ocid="admin-settings-whatsapp-input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used for WhatsApp popup and order messages. Include country
                code.
              </p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg">
              <div>
                <p className="text-sm font-medium">Stripe Checkout</p>
                <p className="text-xs text-muted-foreground">
                  Accept card payments via Stripe
                </p>
              </div>
              <Switch
                checked={settings.stripeEnabled}
                onCheckedChange={(v) => setField("stripeEnabled", v)}
                data-ocid="admin-settings-stripe-switch"
              />
            </div>

            <div className="flex items-center justify-between py-2 px-4 bg-muted/40 rounded-lg">
              <div>
                <p className="text-sm font-medium">WhatsApp Orders</p>
                <p className="text-xs text-muted-foreground">
                  Allow customers to place orders via WhatsApp
                </p>
              </div>
              <Switch
                checked={settings.whatsappOrderEnabled}
                onCheckedChange={(v) => setField("whatsappOrderEnabled", v)}
                data-ocid="admin-settings-whatsapp-orders-switch"
              />
            </div>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section className="bg-card border border-destructive/30 rounded-xl p-6 space-y-4 shadow-subtle">
          <h2 className="font-display font-semibold text-base flex items-center gap-2 text-destructive border-b border-destructive/20 pb-3">
            <Shield className="w-4 h-4" />
            Maintenance Mode
          </h2>
          <div className="flex items-center justify-between py-2 px-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <div>
              <p className="text-sm font-medium">Enable Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">
                Hides the site from visitors. Only admins can access it.
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(v) => setField("maintenanceMode", v)}
              data-ocid="admin-settings-maintenance-switch"
            />
          </div>
        </section>

        {/* Save Settings button */}
        <Button
          type="submit"
          className="btn-primary gap-2"
          disabled={saveMutation.isPending}
          data-ocid="admin-settings-save-button"
        >
          {saveMutation.isPending ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saveMutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </form>

      {/* Security — Internet Identity */}
      <div className="max-w-2xl mt-8">
        <section className="bg-card border border-primary/20 rounded-xl p-6 space-y-4 shadow-subtle">
          <h2 className="font-display font-semibold text-base flex items-center gap-2 text-primary border-b border-primary/20 pb-3">
            <ShieldCheck className="w-4 h-4" />
            Security &amp; Authentication
          </h2>
          <div className="flex gap-3 items-start bg-primary/5 border border-primary/20 rounded-xl p-4">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">
                Secured by Internet Identity
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This admin panel uses{" "}
                <strong className="text-foreground">Internet Identity</strong>{" "}
                for authentication — ICP&apos;s secure, privacy-preserving login
                system. No passwords are stored anywhere. Your identity is
                cryptographically verified on every session.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                To manage your Internet Identity (devices, recovery, etc.),
                visit{" "}
                <a
                  href="https://identity.internetcomputer.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  identity.internetcomputer.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
