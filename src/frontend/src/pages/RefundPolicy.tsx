import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const acceptedReasons = [
  "Product is physically damaged or broken on delivery",
  "Product is defective (seal broken, contaminated, or unusable)",
  "Wrong product was delivered (different from what was ordered)",
];

const rejectedReasons = [
  "Customer is not satisfied with the taste, smell, or appearance",
  "Price issue or cheaper alternative found elsewhere",
  "Personal preference or change of mind",
  "Product was opened and used partially",
  "Return request made after 7 days of delivery",
];

const returnSteps = [
  {
    step: "01",
    title: "Contact Us Within 7 Days",
    description:
      "Reach out via WhatsApp or email within 7 days of delivery. Share your order details and describe the issue clearly.",
  },
  {
    step: "02",
    title: "Submit Proof",
    description:
      "Share clear photos or a video of the damaged or defective product. This helps us process your request faster.",
  },
  {
    step: "03",
    title: "Verification",
    description:
      "Our team will review the evidence within 1–2 business days and confirm if the return is eligible.",
  },
  {
    step: "04",
    title: "Resolution",
    description:
      "On approval, we'll arrange a replacement or refund. Refunds are processed within 5–7 business days.",
  },
];

export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Refund &amp; Return Policy — Farm72"
        description="Farm72 refund and return policy. Returns accepted within 7 days for damaged or defective products only. Learn how to initiate a return request."
      />
      {/* Header */}
      <section className="bg-muted/40 py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
            data-ocid="refund-policy.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-organic mb-3 inline-flex">Policy</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Refund &amp; Return Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              At Farm72, we are committed to delivering the highest quality
              cold-pressed oils. Please read our refund and return policy
              carefully before placing an order.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: April 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
          {/* 7-day window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Return Window — 7 Days Only
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              All return and refund requests must be raised within{" "}
              <strong className="text-foreground">7 calendar days</strong> from
              the date of delivery. Any request submitted after this period will
              not be entertained, regardless of the reason. We strongly
              recommend inspecting your order on arrival and reporting any issue
              promptly.
            </p>
          </motion.div>

          {/* Accepted vs Not Accepted — two columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Accepted */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-7 shadow-card border border-green-200"
            >
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Valid Return Reasons
                </h3>
              </div>
              <ul className="space-y-3">
                {acceptedReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Accepted */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-7 shadow-card border border-border"
            >
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-6 h-6 text-destructive/70" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Non-Returnable Situations
                </h3>
              </div>
              <ul className="space-y-3">
                {rejectedReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Important note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm mb-1">
                Important Notice
              </p>
              <p className="text-amber-700 text-sm leading-relaxed">
                Farm72 products are food-grade consumables. Once the product
                seal is broken or the product has been used, it cannot be
                returned under any circumstances, even if the return is within
                the 7-day window and the original reason was valid.
              </p>
            </div>
          </motion.div>

          {/* Return process steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              How to Initiate a Return
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {returnSteps.map((item) => (
                <div
                  key={item.step}
                  className="relative bg-card rounded-xl p-5 shadow-card border border-border"
                >
                  <span className="font-display text-4xl font-black text-primary/10 absolute top-3 right-4 select-none leading-none">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center mb-3">
                    <span className="text-primary-foreground font-bold text-sm">
                      {Number.parseInt(item.step)}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Refund timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Refund Timeline
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Return Request Review", time: "1–2 business days" },
                { label: "Pickup/Collection", time: "3–5 business days" },
                {
                  label: "Refund Credit",
                  time: "5–7 business days after pickup",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted/40 rounded-xl p-4 text-center"
                >
                  <p className="font-display font-bold text-lg text-primary">
                    {item.time}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
              Refunds are processed to the original payment method. For
              WhatsApp/cash orders, we will contact you to arrange the refund
              directly.
            </p>
          </motion.div>

          {/* Contact for returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 text-primary-foreground"
          >
            <h2 className="font-display text-xl font-bold mb-2">
              Need to Return Something?
            </h2>
            <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
              Contact us immediately with your order details and photos of the
              issue. Our team will guide you through the process.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/917500010488"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] rounded-xl text-white text-sm font-semibold hover:bg-[#20bc5b] transition-colors"
                data-ocid="refund-policy.whatsapp_link"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +91 7500010488
              </a>
              <a
                href="mailto:info@farm72.in"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 rounded-xl text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/25 transition-colors"
                data-ocid="refund-policy.email_link"
              >
                <Mail className="w-4 h-4" />
                info@farm72.in
              </a>
              <a
                href="tel:+917500010488"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/15 rounded-xl text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/25 transition-colors"
                data-ocid="refund-policy.phone_link"
              >
                <Phone className="w-4 h-4" />
                +91 7500010488
              </a>
            </div>
          </motion.div>

          {/* Back link */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Link to="/shop">
              <Button
                className="btn-primary"
                data-ocid="refund-policy.shop_button"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link to="/terms" className="text-sm text-primary hover:underline">
              View Terms &amp; Conditions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
