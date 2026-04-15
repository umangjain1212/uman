import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  FlameKindling,
  Leaf,
  Sprout,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const heroSlides = [
  {
    imageUrl: "/assets/images/hero1.png",
    alt: "Farm72 cold pressed oil bottles",
    title: "Pure Cold Pressed Oils",
    subtitle: "Healthy Living Starts Here",
    highlight: "Pressed",
  },
  {
    imageUrl: "/assets/images/hero2.png",
    alt: "Farm72 product lineup — Mustard, Coconut, Sesame oils",
    title: "From Pure Seeds",
    subtitle: "Nothing Added. Nothing Removed",
    highlight: "Pure",
  },
  {
    imageUrl: "/assets/images/hero3.png",
    alt: "Mustard field at sunrise with Farm72 bottle",
    title: "Wood Pressed Tradition",
    subtitle: "Slow. Natural. Powerful",
    highlight: "Tradition",
  },
  {
    imageUrl: "/assets/images/hero4.jpg",
    alt: "Farm72 natural organic ingredients",
    title: "Himalayan Buransh Juice",
    subtitle: "Pure. Refreshing. Naturally Powerful",
    highlight: "Buransh",
  },
  {
    imageUrl: "/assets/images/hero5.jpg",
    alt: "Fresh coconuts with palm leaves",
    title: "Crafted for Purity",
    subtitle: "Premium Quality Oils",
    highlight: "Purity",
  },
];

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "No preservatives, no additives — just pure cold-pressed oil straight from the seed to your kitchen.",
  },
  {
    icon: Droplets,
    title: "Chemical-Free",
    description:
      "Zero hexane, zero bleaching agents. Every drop is clean and unadulterated as nature intended.",
  },
  {
    icon: FlameKindling,
    title: "Traditional Method",
    description:
      "The age-old Kacchi Ghani process presses at low temperature, locking in nutrients and natural aroma.",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating],
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <div
      className="relative h-[88vh] min-h-[580px] max-h-[820px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.imageUrl}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={slide.alt}
        >
          {/* LCP preload hint for first slide */}
          {i === 0 && (
            <img
              src={slide.imageUrl}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              loading="eager"
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
            />
          )}
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 hero-overlay z-20" />

      {/* Left-aligned overlay content */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-sm md:max-w-md lg:max-w-lg bg-black/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-10 shadow-xl"
          >
            {/* Eyebrow label */}
            <p className="text-amber-400/80 text-xs uppercase tracking-widest font-medium mb-4 flex items-center gap-2">
              <Sprout className="w-3.5 h-3.5" />
              Farm72 · Pure &amp; Natural
            </p>

            {/* Title with highlighted word */}
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {(() => {
                const slide = heroSlides[current];
                const parts = slide.title.split(slide.highlight);
                return (
                  <>
                    {parts[0]}
                    <span style={{ color: "#D4A847" }}>{slide.highlight}</span>
                    {parts[1]}
                  </>
                );
              })()}
            </h1>

            {/* Decorative divider + subtitle */}
            <div className="mt-4 mb-6">
              <div className="w-12 h-px bg-amber-400 mb-3" />
              <p className="text-white/90 text-xs sm:text-sm uppercase tracking-widest font-medium">
                {heroSlides[current].subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Link to="/shop">
                <button
                  type="button"
                  className="bg-white text-green-900 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-amber-400 hover:text-white transition-all duration-200"
                  data-ocid="hero-shop-now"
                >
                  SHOP NOW →
                </button>
              </Link>
              <Link to="/about">
                <button
                  type="button"
                  className="border border-white/60 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/20 transition-all duration-200"
                >
                  OUR STORY
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.imageUrl}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-smooth ${
              i === current
                ? "bg-primary-foreground w-8"
                : "bg-primary-foreground/40 w-3 hover:bg-primary-foreground/60"
            }`}
          />
        ))}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/25 transition-smooth"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/25 transition-smooth"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export function Home() {
  return (
    <div>
      <SEO
        title="Farm72 — Pure Cold Pressed Oils &amp; Buransh Juice"
        description="Shop 100% pure Kacchi Ghani cold-pressed oils and Himalayan Buransh Juice online. Natural, chemical-free, traditional extraction."
      />
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Featured Products */}
      <section className="py-16 bg-background" id="products">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="badge-organic mb-3 inline-flex">Our Products</span>
            <h2 className="section-title">
              Pure Cold Pressed Oils &amp; Buransh Juice
            </h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Straight from nature to your kitchen — each oil pressed fresh to
              lock in maximum nutrition and natural flavour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/shop">
              <Button className="btn-secondary" data-ocid="home-view-all">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Benefits */}
      <section className="py-16 bg-muted/40 leaf-pattern">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-organic mb-3 inline-flex">Why Farm72?</span>
            <h2 className="section-title">
              Good Oils Make <span className="text-primary">Good Living</span>
            </h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              We believe in food that nourishes — not just fills. Our
              cold-pressed process preserves every nutrient nature packed in.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-smooth text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-smooth">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Cold-pressed comparison */}
          <div className="mt-14 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Your Oil.&nbsp;Your Health.
                <br />
                <span className="text-primary">Make the Right Choice.</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most commercial oils are refined with high heat and chemicals,
                destroying natural nutrients. Our Kacchi Ghani process presses
                at low temperatures to retain every nutrient, enzyme, and
                antioxidant.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Extraction Temp", cold: "< 40°C", hot: "> 200°C" },
                  { label: "Nutrient Retention", cold: "100%", hot: "< 40%" },
                  {
                    label: "Chemicals Used",
                    cold: "None",
                    hot: "Hexane + others",
                  },
                  {
                    label: "Natural Colour",
                    cold: "Preserved",
                    hot: "Bleached",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="bg-background rounded-xl p-4 shadow-subtle border border-border"
                  >
                    <p className="text-xs text-muted-foreground font-medium mb-2">
                      {row.label}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm font-bold text-primary">
                        {row.cold}
                      </span>
                      <span className="text-muted-foreground text-xs">vs</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {row.hot}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&q=80"
                alt="Organic farm with fresh produce"
                className="rounded-2xl shadow-elevated object-cover w-full h-80 md:h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-card-hover border border-border">
                <p className="font-display font-bold text-2xl text-primary">
                  72+
                </p>
                <p className="text-sm text-muted-foreground">
                  Years of tradition
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-primary" data-ocid="cta-strip">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience the Purity
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
            Order today and taste the difference of genuine cold-pressed oils —
            fresh, natural, and full of life.
          </p>
          <Link to="/shop">
            <Button
              className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 py-3 shadow-elevated transition-smooth"
              data-ocid="cta-shop-now"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
