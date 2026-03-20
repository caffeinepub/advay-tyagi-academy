import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Globe,
  GraduationCap,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const mockLessons = [
  {
    id: 1,
    day: 1,
    title: "The Rise of Multipolar World Order",
    date: "March 1, 2026",
    preview:
      "Exploring the shift from US unipolarity to a world with multiple power centers...",
  },
  {
    id: 2,
    day: 2,
    title: "Indo-Pacific Strategy: Key Players",
    date: "March 2, 2026",
    preview:
      "How China, India, Japan, and the US are reshaping regional dynamics...",
  },
  {
    id: 3,
    day: 3,
    title: "Energy Geopolitics in 2026",
    date: "March 3, 2026",
    preview:
      "Oil, gas, and renewable energy as instruments of geopolitical leverage...",
  },
];

const mockMasterclasses = [
  {
    id: 1,
    title: "Global Power Dynamics",
    icon: Globe,
    description:
      "Master the forces shaping the international balance of power.",
    featured: false,
  },
  {
    id: 2,
    title: "Geopolitical Strategy",
    icon: GraduationCap,
    description: "Deep-dive into strategic thinking used by world leaders.",
    featured: true,
  },
  {
    id: 3,
    title: "International Relations",
    icon: BookOpen,
    description: "Understand treaties, diplomacy, and global institutions.",
    featured: false,
  },
];

const reviews = [
  {
    id: 1,
    rating: 5,
    quote:
      "Advay Sir's explanations of geopolitical concepts are unmatched. The daily lessons completely transformed how I approach world affairs in my Mains answers.",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "The masterclass on Global Power Dynamics gave me a framework I keep coming back to. The content is dense but incredibly well-structured.",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "I've tried many geopolitics courses — none come close. Advay Tyagi Academy is the real deal for anyone serious about understanding the world.",
  },
  {
    id: 4,
    rating: 4,
    quote:
      "The India-China module alone was worth the subscription. My case study analysis has become significantly more nuanced since joining.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.11 0.028 243) 0%, oklch(0.16 0.03 243) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.11 74) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span
              className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-gold mb-6 px-4 py-1.5 rounded-full border border-gold/30"
              style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.1)" }}
            >
              Geopolitics Education
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl font-bold text-gold leading-tight mb-6">
              Understand
              <br />
              The World.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
              Master geopolitics, international relations, and global power
              dynamics through Advay Tyagi's world-class academy. Join thousands
              of strategic thinkers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-full px-8 h-12 text-base"
                data-ocid="hero.primary_button"
              >
                <Link to="/masterclasses">
                  Join the Academy <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-card font-sans rounded-full px-8 h-12 text-base"
                data-ocid="hero.secondary_button"
              >
                <Link to="/geopolitics">Explore Lessons</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Geopolitics Preview */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Geopolitics Day-by-Day
          </h2>
          <p className="text-muted-foreground font-sans">
            A new lesson every day. Build your strategic intellect step by step.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {mockLessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl p-5 border group hover:border-gold/50 transition-colors"
              style={{
                backgroundColor: "oklch(0.22 0.008 240)",
                borderColor: "oklch(0.28 0.028 243)",
              }}
            >
              <span className="text-xs font-sans font-semibold text-gold uppercase tracking-widest">
                Day {lesson.day}
              </span>
              <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-2">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans line-clamp-2">
                {lesson.preview}
              </p>
              <p className="text-xs text-muted-foreground font-sans mt-3">
                {lesson.date}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-border text-foreground hover:bg-card font-sans rounded-full"
            data-ocid="home.geopolitics.button"
          >
            <Link to="/geopolitics">
              View All Lessons <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Masterclasses Preview */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ backgroundColor: "oklch(0.16 0.028 243)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our Masterclasses
            </h2>
            <p className="text-muted-foreground font-sans">
              In-depth courses by Advay Tyagi. Just ₹500/year for full access.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mockMasterclasses.map((mc, i) => (
              <motion.div
                key={mc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-xl p-6 border ${
                  mc.featured ? "border-gold shadow-gold" : ""
                }`}
                style={{
                  backgroundColor: "oklch(0.22 0.008 240)",
                  borderColor: mc.featured
                    ? "oklch(0.72 0.11 74)"
                    : "oklch(0.28 0.028 243)",
                }}
              >
                {mc.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-primary-foreground bg-gold rounded-full px-3 py-1 mb-4">
                    <Star className="w-3 h-3" /> Most Popular
                  </span>
                )}
                <mc.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {mc.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans mb-4">
                  {mc.description}
                </p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-sans font-bold text-foreground">
                    ₹500
                  </span>
                  <span className="text-sm text-muted-foreground font-sans">
                    / year
                  </span>
                </div>
                <Button
                  asChild
                  className={`w-full font-sans font-semibold rounded-lg ${
                    mc.featured
                      ? "bg-gold text-primary-foreground hover:bg-gold-light"
                      : "bg-card border border-border text-foreground hover:border-gold/50"
                  }`}
                  data-ocid={`masterclass.enroll.button.${i + 1}`}
                >
                  <Link to="/masterclasses">Enroll Now</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ backgroundColor: "oklch(0.13 0.02 243)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground font-sans">
              Real voices from the Advay Tyagi Academy community.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border p-7"
                style={{
                  backgroundColor: "oklch(0.22 0.008 240)",
                  borderColor: "oklch(0.28 0.028 243)",
                }}
                data-ocid={`review.item.${i + 1}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk, si) => (
                    <Star
                      key={sk}
                      className="w-4 h-4"
                      style={{
                        fill:
                          si < review.rating
                            ? "oklch(0.72 0.11 74)"
                            : "transparent",
                        color: "oklch(0.72 0.11 74)",
                      }}
                    />
                  ))}
                </div>
                <blockquote className="font-sans text-foreground text-sm leading-relaxed mb-5 italic">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.15)" }}
                  >
                    <User className="w-5 h-5 text-gold" />
                  </div>
                  <p className="font-sans font-semibold text-sm text-muted-foreground">
                    Anonymous
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
