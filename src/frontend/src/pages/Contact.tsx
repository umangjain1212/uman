import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@farm72.in",
    href: "mailto:info@farm72.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9876543210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Farm72, India",
    href: null,
  },
];

const faqs = [
  {
    q: "What is cold-pressed oil?",
    a: "Cold-pressed oils are extracted mechanically at low temperatures, preserving nutrients, natural aroma, and flavor without any chemical solvents.",
  },
  {
    q: "How should I store my oils?",
    a: "Store in a cool, dark place away from direct sunlight. Best kept below 25°C. Refrigeration is not required but can extend shelf life.",
  },
  {
    q: "Do you offer bulk / wholesale orders?",
    a: "Yes! We offer special pricing for bulk orders. Drop us a message with your requirements and we'll get back to you within 24 hours.",
  },
];

export function Contact() {
  const { actor } = useActor(createActor);
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  function handleChange(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const success = await actor!.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (success) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setErrorMessage("We couldn't send your message. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or reach us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="green-gradient-bg leaf-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-organic mb-4 inline-flex">Contact Us</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="section-subtitle max-w-lg mx-auto">
              We'd love to hear from you. Whether you have a question about our
              oils, need help with an order, or want to discuss bulk pricing —
              we're here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Left — Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Contact Info Card */}
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <h2 className="font-display text-xl font-bold mb-6">
                  Reach Us Directly
                </h2>
                <div className="flex flex-col gap-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-primary-foreground font-medium hover:text-primary-foreground/80 transition-smooth"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-primary-foreground font-medium">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl bg-primary-foreground/15 hover:bg-primary-foreground/25 transition-smooth font-medium text-primary-foreground text-sm"
                  data-ocid="contact-whatsapp"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
                <div className="relative bg-muted/40 h-44 flex flex-col items-center justify-center gap-2 p-4">
                  {/* Decorative map-like background */}
                  <div className="absolute inset-0 overflow-hidden opacity-20">
                    <svg
                      role="img"
                      aria-labelledby="map-title"
                      viewBox="0 0 400 180"
                      className="w-full h-full"
                      fill="none"
                    >
                      <title id="map-title">Map of India</title>
                      <rect width="400" height="180" fill="none" />
                      {/* Grid lines */}
                      {[30, 60, 90, 120, 150].map((y) => (
                        <line
                          key={`h-${y}`}
                          x1="0"
                          y1={y}
                          x2="400"
                          y2={y}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-primary"
                        />
                      ))}
                      {[50, 100, 150, 200, 250, 300, 350].map((x) => (
                        <line
                          key={`v-${x}`}
                          x1={x}
                          y1="0"
                          x2={x}
                          y2="180"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-primary"
                        />
                      ))}
                      {/* India silhouette approximation */}
                      <path
                        d="M165 30 L215 28 L240 50 L250 80 L245 110 L230 130 L210 150 L195 165 L180 150 L160 125 L148 100 L145 75 L155 50 Z"
                        fill="currentColor"
                        className="text-accent"
                        opacity="0.6"
                      />
                    </svg>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-elevated">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="font-display font-bold text-foreground text-sm">
                      Farm72
                    </p>
                    <p className="text-muted-foreground text-xs">India</p>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">
                      Business Hours:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      Mon–Fri 9AM–6PM, Sat 9AM–3PM
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <h2 className="font-display text-xl font-bold mb-1">
                  Send a Message
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We typically reply within 24 business hours.
                </p>

                {/* Success Banner */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30 mb-6"
                    data-ocid="contact-success-banner"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Message sent!
                      </p>
                      <p className="text-muted-foreground text-sm">
                        We'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Banner */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-6"
                    data-ocid="contact-error-banner"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-destructive text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={
                        errors.name
                          ? "border-destructive focus-visible:ring-destructive/30"
                          : ""
                      }
                      data-ocid="contact-name"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={
                        errors.email
                          ? "border-destructive focus-visible:ring-destructive/30"
                          : ""
                      }
                      data-ocid="contact-email"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you? (minimum 20 characters)"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`min-h-[130px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      data-ocid="contact-message"
                      disabled={isSubmitting}
                    />
                    <div className="flex items-start justify-between mt-1.5">
                      {errors.message ? (
                        <p className="text-destructive text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-xs ml-auto ${form.message.length < 20 && form.message.length > 0 ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {form.message.length}/20 min
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="btn-primary w-full text-sm mt-1"
                    data-ocid="contact-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="badge-organic mb-3 inline-flex">FAQ</span>
            <h2 className="section-title mb-2">Common Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to things our customers often ask.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-smooth hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  aria-expanded={openFaq === faq.q}
                  data-ocid={`faq-toggle-${faq.q.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {faq.q}
                  </span>
                  <span
                    className={`text-muted-foreground transition-transform duration-200 ${openFaq === faq.q ? "rotate-45" : ""}`}
                  >
                    <svg
                      role="img"
                      aria-label="Toggle"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2v10M2 7h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === faq.q && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
