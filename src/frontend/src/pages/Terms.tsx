import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using the Farm72 website (farm72.in) and purchasing our
        products, you agree to be bound by these Terms &amp; Conditions. If you
        do not agree with any part of these terms, please do not use our website
        or services. We reserve the right to update these terms at any time
        without prior notice. Continued use of the website after changes
        constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    id: "usage",
    title: "2. Website Usage Rules",
    content: (
      <ul className="space-y-2 list-none">
        {[
          "You must be at least 18 years old to place an order on Farm72.",
          "You agree not to use the website for any unlawful or fraudulent purpose.",
          "You must not attempt to gain unauthorized access to any part of the website or its systems.",
          "You may not copy, reproduce, or redistribute website content without written permission from Farm72.",
          "All trademarks, logos, and brand names displayed on the site are the property of Farm72.",
          "We reserve the right to restrict or terminate access to anyone who violates these terms.",
        ].map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "orders",
    title: "3. Orders &amp; Payment",
    content: (
      <div className="space-y-3">
        <p>
          <strong className="text-foreground">Order Confirmation:</strong> All
          orders are subject to availability and confirmation. Farm72 reserves
          the right to refuse or cancel any order at its sole discretion. You
          will receive an order confirmation via WhatsApp or email after
          successful placement.
        </p>
        <p>
          <strong className="text-foreground">Pricing:</strong> All prices are
          listed in Indian Rupees (INR) and are inclusive of applicable taxes
          unless otherwise stated. Prices may change without prior notice.
          Discounts and offers are valid only for the stated period.
        </p>
        <p>
          <strong className="text-foreground">Payment Methods:</strong> We
          accept payments via card (Stripe) and WhatsApp-based manual orders.
          All online card payments are processed through Stripe's secure payment
          gateway. Farm72 does not store your payment card details.
        </p>
        <p>
          <strong className="text-foreground">Delivery:</strong> Estimated
          delivery timelines are provided in good faith but are not guaranteed.
          Farm72 is not liable for delays caused by courier partners, natural
          events, or circumstances beyond our control.
        </p>
      </div>
    ),
  },
  {
    id: "products",
    title: "4. Product Disclaimer",
    content: (
      <div className="space-y-3">
        <p>
          Farm72 cold-pressed oils are natural food products extracted without
          chemicals. Natural variation in colour, aroma, and taste may occur
          between batches — this is a characteristic of genuine cold-pressed
          products, not a defect.
        </p>
        <p>
          Our products are not intended to diagnose, treat, cure, or prevent any
          medical condition. Consult a qualified healthcare professional before
          using any dietary product if you have a medical condition or are
          pregnant.
        </p>
        <p>
          Store products as directed on the label. Farm72 is not responsible for
          quality issues arising from improper storage after delivery.
        </p>
      </div>
    ),
  },
  {
    id: "refunds",
    title: "5. Refunds &amp; Returns",
    content: (
      <p>
        Returns and refunds are governed by our{" "}
        <Link
          to="/refund-policy"
          className="text-primary hover:underline font-medium"
        >
          Refund Policy
        </Link>
        . In summary, returns are accepted within 7 days only if the product is
        defective or damaged. Returns for personal preference, taste, or price
        reasons are not accepted.
      </p>
    ),
  },
  {
    id: "liability",
    title: "6. Liability Disclaimer",
    content: (
      <div className="space-y-3">
        <p>
          Farm72 provides its products and website "as is" without any
          warranties, expressed or implied. We do not guarantee that the website
          will be error-free, uninterrupted, or free of viruses.
        </p>
        <p>
          To the fullest extent permitted by applicable law, Farm72 shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising from the use of our products or website,
          including but not limited to loss of profits, data, or business
          opportunities.
        </p>
        <p>
          Our total liability to you for any claim arising out of or relating to
          these terms shall not exceed the amount you paid for the specific
          product in question.
        </p>
      </div>
    ),
  },
  {
    id: "privacy",
    title: "7. Privacy &amp; Data",
    content: (
      <div className="space-y-3">
        <p>
          We collect only the information necessary to process your orders and
          provide customer support — including your name, phone number, email,
          and delivery address. We do not sell, rent, or share your personal
          data with third parties for marketing purposes.
        </p>
        <p>
          By placing an order, you consent to Farm72 contacting you via
          WhatsApp, phone, or email for order updates and customer service. You
          may opt out of promotional messages at any time.
        </p>
        <p>
          Payment data is handled exclusively by Stripe, a PCI-DSS compliant
          payment processor. Farm72 does not store or process card details on
          its servers.
        </p>
      </div>
    ),
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    content: (
      <p>
        All content on the Farm72 website — including text, images, logos,
        product photos, design, and code — is the intellectual property of
        Farm72 and is protected under applicable copyright laws. Unauthorized
        use, reproduction, or distribution of any content is strictly prohibited
        without prior written consent from Farm72.
      </p>
    ),
  },
  {
    id: "governing",
    title: "9. Governing Law",
    content: (
      <p>
        These Terms &amp; Conditions are governed by and construed in accordance
        with the laws of India. Any disputes arising under or in connection with
        these terms shall be subject to the exclusive jurisdiction of the courts
        located in India. If any provision of these terms is found to be
        unenforceable, the remaining provisions shall remain in full force and
        effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact &amp; Grievances",
    content: (
      <div className="space-y-2">
        <p>
          If you have any questions, concerns, or grievances regarding these
          Terms &amp; Conditions, please reach out to us:
        </p>
        <div className="flex flex-col gap-2 mt-3">
          {[
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: "+91 7500010488",
              href: "https://wa.me/917500010488",
            },
            {
              icon: Mail,
              label: "Email",
              value: "info@farm72.in",
              href: "mailto:info@farm72.in",
            },
            {
              icon: Phone,
              label: "Phone",
              value: "+91 7500010488",
              href: "tel:+917500010488",
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
            >
              <Icon className="w-4 h-4" />
              {label}: {value}
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

export function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms &amp; Conditions — Farm72"
        description="Farm72 terms and conditions. Website usage rules, order and payment policies, product disclaimer, liability terms, and privacy information."
      />
      {/* Header */}
      <section className="bg-muted/40 py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
            data-ocid="terms.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-organic mb-3 inline-flex">Legal</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Please read these terms and conditions carefully before using our
              website or placing an order with Farm72.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: April 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex flex-col gap-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="bg-card rounded-2xl p-7 shadow-card border border-border"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-4 pt-10 border-t border-border mt-10">
            <Link to="/shop">
              <Button className="btn-primary" data-ocid="terms.shop_button">
                Continue Shopping
              </Button>
            </Link>
            <Link
              to="/refund-policy"
              className="text-sm text-primary hover:underline"
            >
              Refund Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
