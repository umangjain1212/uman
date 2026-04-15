import { createActor } from "@/backend";
import type { FaqItem } from "@/backend.d";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Static fallback array — used while loading or if backend returns empty
const staticFaqs: FaqItem[] = [
  {
    id: "1",
    displayOrder: 1n,
    isVisible: true,
    question: "What is cold pressed oil?",
    answer:
      "Cold pressed oil is extracted by mechanically pressing oil seeds or fruits at low temperatures (below 40°C/104°F) without using heat, chemicals, or solvents. This gentle process preserves the natural flavor, aroma, color, and nutritional value of the oil — including vitamins, antioxidants, and essential fatty acids that are typically destroyed by heat or chemical extraction.",
  },
  {
    id: "2",
    displayOrder: 2n,
    isVisible: true,
    question: "What is Kacchi Ghani (Cold Press Method)?",
    answer:
      "Kacchi Ghani is the traditional Indian method of extracting oil by slowly grinding seeds in a wooden or stone press (ghani) at very low speeds. This age-old technique generates minimal heat and preserves all natural nutrients. Farm72 uses this authentic method to bring you the purest form of oil — just as your ancestors used to make it.",
  },
  {
    id: "3",
    displayOrder: 3n,
    isVisible: true,
    question: "Why is cold pressed oil better than expeller or refined oil?",
    answer:
      "Cold pressed oils retain their full natural nutrition — vitamins, minerals, antioxidants, and healthy fatty acids. Expeller-pressed oils use high heat and pressure, destroying many nutrients. Refined oils go through bleaching, deodorizing, and chemical processing that strips away beneficial components. With cold pressed oil, what you see is pure nature — no additives, no processing, just oil in its most natural form.",
  },
  {
    id: "4",
    displayOrder: 4n,
    isVisible: true,
    question: "Does cold pressed oil have more nutrients than refined oil?",
    answer:
      "Yes, significantly more. Cold pressed oils preserve natural Vitamin E, Omega-3 and Omega-6 fatty acids, polyphenols, and antioxidants. These nutrients are largely destroyed during the high heat and chemical refining process used in commercial oil production. Choosing cold pressed means choosing an oil that genuinely nourishes your body.",
  },
  {
    id: "5",
    displayOrder: 5n,
    isVisible: true,
    question:
      "Why does the oil look slightly cloudy or have sediment at the bottom?",
    answer:
      "This is completely natural and a sign of purity. As the oil is not filtered using any chemical or solvents, oil seed particles might settle down at the bottom — this is completely natural and safe for consumption. The cloudiness and natural sediment are signs that the oil is unrefined and retains its full nutritional profile. Simply shake the bottle gently before use.",
  },
  {
    id: "6",
    displayOrder: 6n,
    isVisible: true,
    question:
      "Is the sediment or settled particles at the bottom safe to consume?",
    answer:
      "Absolutely. The sediment you see is simply natural plant material from the oil seeds — it contains fiber, nutrients, and beneficial compounds. Since Farm72 oils are not chemically filtered or refined, these particles remain in the oil. They are 100% safe and beneficial for consumption. This is actually a quality indicator — it means your oil is genuinely natural and unprocessed.",
  },
  {
    id: "7",
    displayOrder: 7n,
    isVisible: true,
    question: "Is Farm72 oil completely chemical-free?",
    answer:
      "Yes. Farm72 oils are extracted purely through mechanical cold pressing — no chemicals, no solvents, no hexane, no bleaching agents, and no artificial preservatives. Every bottle contains only pure, naturally extracted oil. This is the same way oil was made for generations — clean, safe, and completely natural.",
  },
  {
    id: "8",
    displayOrder: 8n,
    isVisible: true,
    question: "What are the health benefits of cold pressed oils?",
    answer:
      "Cold pressed oils offer numerous health benefits: they support heart health with natural fatty acids, boost immunity with antioxidants and vitamins, aid digestion, promote healthy skin and hair, reduce inflammation, and provide essential nutrients that refined oils simply cannot match. Regular use of pure cold pressed oils is associated with better overall health and wellbeing.",
  },
  {
    id: "9",
    displayOrder: 9n,
    isVisible: true,
    question: "What is the shelf life of Farm72 oils?",
    answer:
      "Farm72 cold pressed oils have a shelf life of approximately 6–12 months from the date of manufacture when stored properly. Because they contain no artificial preservatives, they are best consumed fresh. Always check the manufacturing/expiry date on the label.",
  },
  {
    id: "10",
    displayOrder: 10n,
    isVisible: true,
    question: "How should I store Farm72 oils?",
    answer:
      "Store your Farm72 oils in a cool, dry place away from direct sunlight. A kitchen cupboard or pantry is ideal. Avoid storing near the stove or in areas with temperature fluctuations. After opening, use within 3–4 months for best flavor and nutrition. Refrigeration is optional but can help extend freshness, especially in hot climates.",
  },
  {
    id: "11",
    displayOrder: 11n,
    isVisible: true,
    question: "What oils does Farm72 offer?",
    answer:
      "Farm72 currently offers a range of pure cold pressed oils and natural products: Coconut Oil, Sesame/Til Oil (available in 1 liter and 500ml), Black Mustard Oil (1 liter), Yellow Mustard Oil (1 liter), and Buransh Juice (500ml and 250ml). All products are 100% natural, cold pressed, and free from chemicals and preservatives.",
  },
  {
    id: "12",
    displayOrder: 12n,
    isVisible: true,
    question: "How can I place an order with Farm72?",
    answer:
      "You can place an order directly through our website — browse our Shop, add products to your cart, and checkout securely. You can also connect with us directly on WhatsApp for personalized assistance, bulk orders, or any queries. We deliver across India and are committed to getting the purest oils to your doorstep as quickly as possible.",
  },
  {
    id: "13",
    displayOrder: 13n,
    isVisible: true,
    question: "What is Buransh Juice and where does it come from?",
    answer:
      "Buransh Juice is made from the flowers of the Himalayan Rhododendron (Buransh) tree, which bloom in the Valley of Flowers and Himalayan region of India. These vibrant red flowers are handpicked and naturally processed to extract the juice. It is 100% natural, free from preservatives and artificial additives.",
  },
  {
    id: "14",
    displayOrder: 14n,
    isVisible: true,
    question: "How does Buransh Juice help in summer?",
    answer:
      "Buransh Juice has natural cooling properties that help keep the body cool during hot summer months. It helps regulate body temperature, reduces heat-related fatigue, and keeps you refreshed and hydrated naturally. A glass of Buransh Juice is a traditional Himalayan remedy for beating the summer heat.",
  },
  {
    id: "15",
    displayOrder: 15n,
    isVisible: true,
    question: "What are the health benefits of Buransh Juice?",
    answer:
      "Buransh Juice is rich in antioxidants and natural compounds that support digestive health and stomach function. It is good for the stomach, aids in digestion, and contains natural anti-inflammatory properties from the Himalayan Rhododendron flower. It is 100% natural with no preservatives or artificial additives — purely from nature's Himalayan gift.",
  },
];

function useFaqItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FaqItem[]>({
    queryKey: ["faqItems"],
    queryFn: async () => {
      if (!actor) return staticFaqs;
      const items = await actor.getFaqItems();
      if (!items || items.length === 0) return staticFaqs;
      return [...items]
        .filter((f) => f.isVisible)
        .sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder));
    },
    enabled: !!actor && !isFetching,
    placeholderData: staticFaqs,
  });
}

function FAQItem({
  faq,
  index,
}: {
  faq: FaqItem;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-xl shadow-card border border-border overflow-hidden"
      data-ocid={`faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={open}
        data-ocid={`faq.toggle.${index + 1}`}
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="font-display text-sm font-bold text-primary/50 flex-shrink-0 mt-0.5 w-6">
            {String(faq.id).padStart(2, "0")}
          </span>
          <span className="font-display font-semibold text-foreground text-sm sm:text-base leading-snug">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0 border-t border-border">
              <p className="text-muted-foreground text-sm leading-relaxed pl-9 pt-4">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const { data: faqs = staticFaqs, isLoading } = useFaqItems();

  // Split: first 12 = oil/general FAQs, rest = Buransh Juice FAQs
  const mainFaqs = faqs.filter((_, i) => i < 12);
  const buranshFaqs = faqs.filter((_, i) => i >= 12);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FAQ — Farm72 | Cold Pressed Oils &amp; Buransh Juice Questions"
        description="Answers to frequently asked questions about Farm72 cold pressed oils, Kacchi Ghani process, Buransh Juice, sediment, storage, and health benefits."
      />
      {/* ── Header ── */}
      <section className="bg-muted/40 py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
            data-ocid="faq.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="badge-organic inline-flex">FAQ</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Everything you need to know about cold pressed oils, our Kacchi
              Ghani process, and Farm72 products. Can't find an answer? Reach
              out on WhatsApp — we're happy to help.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {isLoading
                ? "Loading questions…"
                : `${faqs.length} questions answered`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ List ── */}
      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {isLoading ? (
            <div className="space-y-3" data-ocid="faq.loading_state">
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((skId) => (
                <div
                  key={skId}
                  className="bg-card rounded-xl border border-border p-5 space-y-2"
                >
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3" data-ocid="faq.list">
              {mainFaqs.map((faq, i) => (
                <FAQItem key={faq.id} faq={faq} index={i} />
              ))}

              {/* ── Buransh Juice FAQs ── */}
              {buranshFaqs.length > 0 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px flex-1 bg-border" />
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        🌸 Buransh Juice — Himalayan FAQs
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </motion.div>

                  {buranshFaqs.map((faq, i) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      index={mainFaqs.length + i}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-primary rounded-2xl p-8 text-primary-foreground text-center"
          >
            <h2 className="font-display text-xl font-bold mb-2">
              Still have questions?
            </h2>
            <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed max-w-md mx-auto">
              Our team is always ready to help. Connect with us on WhatsApp for
              quick answers, bulk order queries, or anything else.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/917500010488"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] rounded-xl text-white text-sm font-semibold hover:bg-[#20bc5b] transition-colors"
                data-ocid="faq.whatsapp_link"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <Link to="/shop">
                <Button
                  className="bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-smooth"
                  data-ocid="faq.shop_button"
                >
                  Shop Our Oils
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* ── Bottom nav ── */}
          <div className="flex items-center gap-4 pt-8 border-t border-border mt-8">
            <Link to="/shop">
              <Button className="btn-primary" data-ocid="faq.continue_shopping">
                Continue Shopping
              </Button>
            </Link>
            <Link
              to="/refund-policy"
              className="text-sm text-primary hover:underline"
            >
              Refund Policy →
            </Link>
            <Link to="/terms" className="text-sm text-primary hover:underline">
              Terms &amp; Conditions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
