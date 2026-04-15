import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Leaf,
  MessageCircle,
  Shield,
  Sprout,
  Thermometer,
} from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Thermometer,
    title: "Natural Body Cooling",
    description:
      "Buransh Juice has natural cooling properties that help keep the body cool during hot summer months. Regulates body temperature and reduces heat-related fatigue.",
  },
  {
    icon: Droplets,
    title: "Digestive Health",
    description:
      "Good for stomach health and aids digestion naturally. A traditional Himalayan remedy consumed for generations to support gut health.",
  },
  {
    icon: Shield,
    title: "Rich in Antioxidants",
    description:
      "The Himalayan Rhododendron flower is naturally rich in antioxidants and anti-inflammatory compounds that support overall health.",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "No preservatives, no artificial colors, no additives. Pure juice from handpicked Himalayan flowers — as nature intended.",
  },
];

const purities = [
  "No artificial preservatives",
  "No chemical solvents",
  "No artificial colors or flavors",
  "No added sugar",
  "Handpicked Himalayan flowers",
  "Naturally processed, not filtered with chemicals",
];

export function BuranshJuice() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Buransh Juice Benefits — Farm72 | Himalayan Rhododendron Juice"
        description="Discover the health benefits of Farm72 Buransh Juice — made from Himalayan Rhododendron flowers. Natural body cooling, digestive health, antioxidant-rich. 100% natural, chemical-free."
        type="website"
      />

      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.85 0.15 150) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.7 0.12 130) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground text-sm font-medium mb-6">
              <Sprout className="w-4 h-4 text-accent" />
              Himalayan Natural Drink
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Buransh Juice
              <br />
              <span className="text-accent">Nature's Himalayan Gift</span>
            </h1>
            <p className="text-white text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Handpicked from the Valley of Flowers — pure Himalayan
              Rhododendron juice that cools, heals, and nourishes naturally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop">
                <Button
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base px-8 py-3 shadow-elevated"
                  data-ocid="buransh-shop-cta"
                >
                  Shop Buransh Juice
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 text-base px-8 py-3"
                  data-ocid="buransh-our-story"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Origin</span>
            <h2 className="section-title">From the Himalayan Highlands</h2>
            <p className="section-subtitle mt-2 max-w-xl mx-auto">
              The story of Buransh Juice begins high in the Himalayan forests,
              where vibrant red Rhododendron flowers bloom each spring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                The Buransh Tree
                <br />
                <span className="text-primary">Rhododendron arboreum</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Buransh (Rhododendron arboreum) is the state flower of
                Uttarakhand and one of the most prized flowers of the Himalayan
                region. These vibrant crimson blossoms grow in the Valley of
                Flowers and high-altitude Himalayan forests at elevations above
                1,500 metres.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every spring, these flowers are handpicked by local communities
                who have been harvesting and consuming Buransh juice for
                generations. Farm72 partners directly with these communities to
                bring you the purest form of this Himalayan treasure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The flowers are naturally processed without any chemical
                solvents or artificial additives — preserving every ounce of
                goodness that nature packed into these extraordinary blossoms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                Valley of Flowers
              </h3>
              <ul className="space-y-3">
                {[
                  "Grown at 1,500–3,000 metres altitude in the Himalayas",
                  "State flower of Uttarakhand, India",
                  "Handpicked during peak bloom season (March–May)",
                  "Sourced directly from Himalayan farming communities",
                  "Traditional Himalayan health drink — consumed for generations",
                  "UNESCO World Heritage region of origin",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-4 inline-flex">Benefits</span>
            <h2 className="section-title">Why Drink Buransh Juice?</h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Generations of Himalayan communities have relied on Buransh Juice
              for its remarkable health properties.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card transition-smooth hover:shadow-card-hover hover:-translate-y-1 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-smooth">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purity Promise */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="badge-organic mb-4 inline-flex">Purity</span>
            <h2 className="section-title">Our Purity Promise</h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Farm72 Buransh Juice is as pure as the Himalayan air it comes
              from.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-green-200"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {purities.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16" data-ocid="buransh-cta-strip">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Taste the Himalayas
          </h2>
          <p className="text-white text-lg mb-8 max-w-md mx-auto">
            Order Farm72 Buransh Juice today — pure, cooling, and naturally
            Himalayan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop">
              <Button
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base px-8 py-3 shadow-elevated transition-smooth"
                data-ocid="buransh-cta-shop"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="https://wa.me/917500010488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#25D366] text-white font-bold text-base hover:bg-[#20bc5b] transition-colors shadow-elevated"
              data-ocid="buransh-cta-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
