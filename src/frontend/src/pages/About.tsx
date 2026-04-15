import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Droplets,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sprout,
  Thermometer,
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

const purityPoints = [
  "Farm72 products are 100% pure and natural",
  "No chemicals used in any stage of processing",
  "No preservatives added — fresh from source to bottle",
  "Cold pressed using the traditional Kacchi Ghani method",
  "No external additives or artificial processing",
  "Healthy and traditional extraction methods, time-tested over generations",
];

export function About() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Story — Farm72 | Traditional Cold Pressed Oils"
        description="Learn about Farm72 traditional Kacchi Ghani cold-pressing process and Himalayan Buransh Juice origin story."
      />
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
              className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-7 h-7 text-primary" />
                <h3 className="font-display text-xl font-bold text-primary">
                  Cold Pressed Oil
                </h3>
              </div>
              <ul className="space-y-3">
                {coldPressedPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm leading-relaxed">
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

      {/* ── Our Commitment to Purity (NEW SECTION) ── */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Purity</span>
            <h2 className="section-title">Our Commitment to Purity</h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              We take pride in maintaining the highest standards of quality and
              natural goodness in every product we make.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
          >
            <ul className="grid sm:grid-cols-2 gap-4">
              {purityPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Sediment natural note */}
            <div className="mt-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Leaf className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-sm text-primary/90 leading-relaxed italic">
                <strong className="not-italic font-semibold">
                  Natural Sediment Note:
                </strong>{" "}
                As the oil is not filtered using any chemical or solvents, oil
                seed particles might settle down at the bottom — this is
                completely natural and safe for consumption.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Buransh Juice Section ── */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">
              Buransh Juice
            </span>
            <h2 className="section-title">
              Buransh Juice — Nature's Himalayan Gift
            </h2>
            <p className="section-subtitle mt-2 max-w-xl mx-auto">
              Straight from the Valley of Flowers — handpicked Himalayan
              Rhododendron blossoms, naturally processed into a pure, cooling
              juice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Origin & Story */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">
                From the Himalayan Highlands
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Buransh Juice is made from the flowers of the{" "}
                <span className="font-semibold text-foreground">
                  Himalayan Buransh tree (Rhododendron arboreum)
                </span>
                , the state flower of Uttarakhand. These vibrant red blossoms
                grow in the Valley of Flowers and high Himalayan forests, where
                they are handpicked during their peak bloom season.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Each flower is carefully collected and naturally processed —
                preserving all the goodness that nature packed into these
                extraordinary Himalayan blooms.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Why Buransh Juice?
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: Thermometer,
                    text: "Keeps the body cool in summer — natural cooling properties",
                  },
                  {
                    icon: Droplets,
                    text: "Good for stomach health and aids digestion naturally",
                  },
                  {
                    icon: Shield,
                    text: "Rich in antioxidants with natural anti-inflammatory properties",
                  },
                  {
                    icon: Leaf,
                    text: "100% natural — no preservatives, no artificial colors or additives",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Purity Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-card rounded-2xl p-6 shadow-card border border-green-200 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-1">
                Purely Natural, Purely Himalayan
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our Buransh Juice contains no chemicals, no solvents, and no
                artificial preservatives. It comes directly from the Himalayan
                region — wild, pure, and as nature intended. A traditional
                Himalayan health drink brought straight to your doorstep by
                Farm72.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Callout + CTA ── */}
      <section className="bg-muted/40 py-20">
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
                    href="tel:+917500010488"
                    className="text-primary hover:underline text-sm"
                    data-ocid="about-phone-link"
                  >
                    +91 7500010488
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card border border-green-200 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                  Try Farm72
                </span>
                <h3 className="font-display text-2xl font-bold text-primary mb-3">
                  Try Our Products Today
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Experience the difference of pure, cold-pressed oils. Switch
                  to Farm72 and taste tradition in every drop.
                </p>
              </div>
              <Link to="/shop">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-smooth w-full sm:w-auto"
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
