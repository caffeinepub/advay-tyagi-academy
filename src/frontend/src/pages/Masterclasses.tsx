import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Globe,
  GraduationCap,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const staticMasterclasses = [
  {
    id: 1n,
    icon: Globe,
    title: "Global Power Dynamics",
    description:
      "A comprehensive study of how nations accumulate, project, and balance power in the 21st century.",
    features: [
      "Great Power Competition: US, China, Russia",
      "Soft power vs hard power analysis",
      "Economic interdependence & coercion",
      "Case studies: BRICS, G7, SCO",
      "Live Q&A sessions with Advay Tyagi",
    ],
    featured: false,
  },
  {
    id: 2n,
    icon: GraduationCap,
    title: "Geopolitical Strategy",
    description:
      "Think like a strategist. Learn the frameworks that drive foreign policy decisions.",
    features: [
      "Realism, Liberalism & Constructivism",
      "Balance of power & deterrence theory",
      "Regional flashpoints: Taiwan, Ukraine, Middle East",
      "Strategic communication & propaganda",
      "Exclusive PDF workbooks included",
    ],
    featured: true,
  },
  {
    id: 3n,
    icon: BookOpen,
    title: "International Relations",
    description:
      "From the UN to bilateral treaties — understand the architecture of global diplomacy.",
    features: [
      "History of the modern world order",
      "International law & institutions",
      "Trade diplomacy & sanctions regimes",
      "Climate geopolitics & resource wars",
      "Certificate of completion",
    ],
    featured: false,
  },
];

export default function Masterclasses() {
  const router = useRouter();

  return (
    <main className="pt-24 pb-20">
      {/* Page Header */}
      <section
        className="py-16 px-4 sm:px-6 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.03 243) 0%, oklch(0.14 0.028 243) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.11 74) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-gold mb-4 px-4 py-1.5 rounded-full border border-gold/30"
              style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.1)" }}
            >
              Premium Courses
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Masterclasses
            </h1>
            <p className="text-muted-foreground font-sans text-lg max-w-xl mx-auto">
              World-class geopolitics education. Just{" "}
              <span className="text-gold font-semibold">₹500 per year</span> for
              unlimited access to all courses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staticMasterclasses.map((mc, i) => (
            <motion.div
              key={mc.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl border flex flex-col overflow-hidden ${
                mc.featured ? "md:-mt-4 md:mb-4" : ""
              }`}
              style={{
                backgroundColor: "oklch(0.22 0.008 240)",
                borderColor: mc.featured
                  ? "oklch(0.72 0.11 74)"
                  : "oklch(0.28 0.028 243)",
                boxShadow: mc.featured
                  ? "0 0 30px oklch(0.72 0.11 74 / 0.2)"
                  : undefined,
              }}
              data-ocid={`masterclass.card.${i + 1}`}
            >
              {mc.featured && (
                <div className="bg-gold text-primary-foreground text-xs font-sans font-bold text-center py-2 tracking-widest uppercase">
                  <Star className="w-3 h-3 inline mr-1" /> Most Popular
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.15)" }}
                >
                  <mc.icon className="w-6 h-6 text-gold" />
                </div>

                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                  {mc.title}
                </h2>
                <p className="text-sm text-muted-foreground font-sans mb-6 leading-relaxed">
                  {mc.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-sans font-bold text-foreground">
                    ₹500
                  </span>
                  <span className="text-base text-muted-foreground font-sans">
                    / year
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {mc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground font-sans">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => router.navigate({ to: "/payment" })}
                  className={`w-full font-sans font-semibold rounded-lg ${
                    mc.featured
                      ? "bg-gold text-primary-foreground hover:bg-gold-light"
                      : "bg-card border border-border text-foreground hover:border-gold/50"
                  }`}
                  data-ocid={`masterclass.enroll.button.${i + 1}`}
                >
                  Enroll Now — ₹500/yr
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value prop */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            Why ₹500/year?
          </h2>
          <p className="text-muted-foreground font-sans leading-relaxed">
            Quality geopolitics education shouldn't be locked behind expensive
            paywalls. At just ₹500 per year — less than a cup of coffee per
            month — you get unlimited access to all masterclasses, daily
            lessons, and our full e-books library.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
