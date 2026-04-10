import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sprout,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Heart,
    title: "Better Health",
    description:
      "Rich in natural antioxidants, vitamins, and omega fatty acids that support heart health, immunity, and overall well-being.",
  },
  {
    icon: Leaf,
    title: "Natural Taste",
    description:
      "Unaltered flavor and aroma retained from seed to bottle — oil that tastes exactly as nature intended.",
  },
  {
    icon: Shield,
    title: "No Chemicals",
    description:
      "Zero hexane, zero solvents, zero additives. Pure mechanical pressing — nothing added, nothing removed.",
  },
  {
    icon: Sprout,
    title: "Traditional Method",
    description:
      "Our slow Kacchi Ghani process follows generations-old techniques, respecting both the seed and the consumer.",
  },
];

const coldPressedPoints = [
  "Extracted at low temperature (< 40°C)",
  "Retains all nutrients and vitamins",
  "Chemical-free, solvent-free",
  "Natural color and aroma preserved",
  "Higher nutritional value per spoon",
];

const expellerPoints = [
  "High heat extraction (60–200°C+)",
  "Significant nutrient loss",
  "Chemical solvents often used",
  "Artificial deodorization required",
  "Bleaching agents applied",
];

const processSteps = [
  {
    step: "01",
    title: "Sourcing",
    description:
      "Premium seeds and nuts hand-picked from trusted Indian farms. We partner directly with farmers who follow sustainable practices.",
  },
  {
    step: "02",
    title: "Cleaning",
    description:
      "Every batch is hand-sorted and thoroughly cleaned to remove impurities before pressing begins.",
  },
  {
    step: "03",
    title: "Cold-Pressing",
    description:
      "Slow, traditional Kacchi Ghani method presses oils below 40°C — preserving all nutrients, enzymes, and natural flavors.",
  },
  {
    step: "04",
    title: "Bottling",
    description:
      "Filtered and bottled in hygienic conditions with no preservatives, no artificial additives — sealed fresh for you.",
  },
];

export function About() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=1600&q=80"
          alt="Farm72 — organic farming fields"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/30 backdrop-blur-sm mb-4">
            Our Story
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3">
            About Farm72
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-xl mx-auto">
            Rooted in Tradition, Committed to Purity
          </p>
        </motion.div>
      </section>

      {/* ── Who We Are ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-organic mb-4 inline-flex">Who We Are</span>
            <h2 className="section-title mb-6">
              Pure Oils. Ancient Wisdom. Modern Kitchens.
            </h2>
            <p className="section-subtitle leading-relaxed mb-4">
              Farm72 was born out of a simple belief — that the oils we cook
              with should be as pure as the food we prepare. We provide 100%
              cold-pressed oils using the traditional{" "}
              <strong className="text-foreground font-semibold">
                Kacchi Ghani
              </strong>{" "}
              method, sourcing the finest seeds directly from Indian farms.
            </p>
            <p className="section-subtitle leading-relaxed">
              Based in India, our mission is to bring chemical-free,
              nutrient-rich oils back to modern households — oils that retain
              their natural goodness from seed to table. No shortcuts. No
              compromises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex justify-center gap-12 mt-12"
          >
            {[
              { value: "72+", label: "Years of Tradition" },
              { value: "5", label: "Pure Products" },
              { value: "100%", label: "Chemical Free" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Cold Pressed vs Expeller ── */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Comparison</span>
            <h2 className="section-title">
              Cold Pressed vs Expeller / Refined Oil
            </h2>
            <p className="section-subtitle mt-2 max-w-xl mx-auto">
              Not all oils are equal. Here's why cold-pressed wins every time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Cold Pressed */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary rounded-2xl p-8 shadow-elevated"
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-7 h-7 text-primary-foreground" />
                <h3 className="font-display text-xl font-bold text-primary-foreground">
                  Cold Pressed Oil
                </h3>
              </div>
              <ul className="space-y-3">
                {coldPressedPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground/90 flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Expeller / Refined */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-7 h-7 text-muted-foreground" />
                <h3 className="font-display text-xl font-bold text-foreground">
                  Expeller / Refined Oil
                </h3>
              </div>
              <ul className="space-y-3">
                {expellerPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive/70 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Benefits</span>
            <h2 className="section-title">Why Choose Farm72?</h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Every bottle of Farm72 oil is a promise — pure, natural, and
              deeply nourishing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Process</span>
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Four careful steps — from farm to your kitchen table.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative bg-card rounded-xl p-6 shadow-card"
              >
                <span className="font-display text-5xl font-black text-primary/10 absolute top-4 right-5 select-none leading-none">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4">
                  <span className="text-primary-foreground font-bold text-sm">
                    {Number.parseInt(item.step)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Callout + CTA ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <span className="badge-organic mb-4 inline-flex">Find Us</span>
              <h3 className="font-display text-xl font-bold text-foreground mb-5">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    Farm72, India
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@farm72.in"
                    className="text-primary hover:underline text-sm"
                    data-ocid="about-email-link"
                  >
                    info@farm72.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+919876543210"
                    className="text-primary hover:underline text-sm"
                    data-ocid="about-phone-link"
                  >
                    +91-9876543210
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 shadow-elevated flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/25 mb-4">
                  Try Farm72
                </span>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
                  Try Our Products Today
                </h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                  Experience the difference of pure, cold-pressed oils. Switch
                  to Farm72 and taste tradition in every drop.
                </p>
              </div>
              <Link to="/shop">
                <Button
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold transition-smooth w-full sm:w-auto"
                  data-ocid="about-shop-cta"
                >
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
