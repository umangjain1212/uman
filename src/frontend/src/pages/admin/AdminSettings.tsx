import { createActor } from "@/backend";
import type { SiteSettings, SiteSettingsInput } from "@/backend.d";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAdmin } from "@/hooks/useAdmin";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Save,
  Settings,
  Shield,
} from "lucide-react";
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
  const { changePassword } = useAdmin();
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

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
      return actor.updateSiteSettingsPartial(input);
    },
    onSuccess: (updated) => {
      setSettings(updated);
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      toast.success("Settings saved successfully!");
    },
    onError: () => {
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

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New password and confirm password do not match.");
      return;
    }

    setChangingPw(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
    } catch (err) {
      setPwError(
        err instanceof Error ? err.message : "Failed to change password",
      );
    } finally {
      setChangingPw(false);
    }
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
            Contact & Payments
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

      {/* Security — Change Password */}
      <div className="max-w-2xl mt-8">
        <section className="bg-card border border-primary/20 rounded-xl p-6 space-y-5 shadow-subtle">
          <h2 className="font-display font-semibold text-base flex items-center gap-2 text-primary border-b border-primary/20 pb-3">
            <KeyRound className="w-4 h-4" />
            Security &amp; Password
          </h2>

          <form
            onSubmit={handlePasswordChange}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current Password */}
              <div className="admin-form-group sm:col-span-2">
                <Label className="admin-form-label" htmlFor="current-password">
                  Current Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="current-password"
                    type={showCurrentPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPwError(null);
                    }}
                    className="pl-9 pr-10"
                    placeholder="Current password"
                    data-ocid="admin-settings-current-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle current password visibility"
                    tabIndex={-1}
                  >
                    {showCurrentPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="admin-form-group">
                <Label className="admin-form-label" htmlFor="new-password">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="new-password"
                    type={showNewPw ? "text" : "password"}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPwError(null);
                    }}
                    className="pl-9 pr-10"
                    placeholder="Min. 8 characters"
                    data-ocid="admin-settings-new-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle new password visibility"
                    tabIndex={-1}
                  >
                    {showNewPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="admin-form-group">
                <Label className="admin-form-label" htmlFor="confirm-password">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPwError(null);
                    }}
                    className="pl-9"
                    placeholder="Repeat new password"
                    data-ocid="admin-settings-confirm-password-input"
                  />
                </div>
              </div>
            </div>

            {pwError && (
              <div
                className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-3 py-2.5 text-sm"
                data-ocid="admin-settings-pw-error-state"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            {pwSuccess && (
              <div
                className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-lg px-3 py-2.5 text-sm"
                data-ocid="admin-settings-pw-success-state"
              >
                <KeyRound className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">
                  Password changed successfully!
                </span>
              </div>
            )}

            <Button
              type="submit"
              variant="outline"
              className="gap-2 border-primary/30 text-primary hover:bg-primary/5"
              disabled={changingPw}
              data-ocid="admin-settings-change-password-button"
            >
              {changingPw ? (
                <span className="w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
              ) : (
                <KeyRound className="w-4 h-4" />
              )}
              {changingPw ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
}
