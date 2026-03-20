import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Clock, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllGeopoliticsLessons } from "../hooks/useQueries";

const mockLessons = [
  {
    id: 1,
    dayNumber: 1,
    title: "The Rise of Multipolar World Order",
    date: "March 1, 2026",
    readTime: "8 min read",
    content:
      "For decades, the United States stood as the singular superpower — the unipolar moment following the Cold War's end. But the 21st century has brought a fundamental restructuring. China's economic ascent, Russia's reassertion, and the emergence of middle powers like India, Brazil, and Turkey are creating a world where no single nation dominates. This lesson explores the mechanisms of this shift and what it means for global stability, trade, and security.",
    tags: ["Power Politics", "US Foreign Policy", "China"],
  },
  {
    id: 2,
    dayNumber: 2,
    title: "Indo-Pacific Strategy: Key Players & Flashpoints",
    date: "March 2, 2026",
    readTime: "10 min read",
    content:
      "The Indo-Pacific region — spanning from the eastern coast of Africa to the Pacific Islands — has become the defining theater of 21st-century geopolitics. This lesson maps the key actors: the United States (INDOPACOM), China (BRI, PLAN expansion), India (Act East Policy), Japan (Free and Open Indo-Pacific), and the Association of Southeast Asian Nations. We examine territorial disputes in the South China Sea, the Taiwan Strait question, and the role of QUAD and AUKUS.",
    tags: ["Indo-Pacific", "China", "QUAD"],
  },
  {
    id: 3,
    dayNumber: 3,
    title: "Energy Geopolitics: Oil, Gas & the Green Transition",
    date: "March 3, 2026",
    readTime: "9 min read",
    content:
      "Energy has always been at the heart of geopolitical strategy. The Russia-Ukraine war laid bare Europe's dangerous dependence on Russian gas. Meanwhile, OPEC+ wields oil production as a political instrument. This lesson examines how fossil fuel resources shape alliances, fund authoritarian regimes, and drive conflict — while also exploring how the green energy transition is creating new geopolitical fault lines around critical minerals like lithium and cobalt.",
    tags: ["Energy", "Russia", "Europe"],
  },
  {
    id: 4,
    dayNumber: 4,
    title: "Technology Wars: Semiconductors & Digital Sovereignty",
    date: "March 4, 2026",
    readTime: "11 min read",
    content:
      "The chip is the new oil. Control over semiconductor supply chains — from TSMC in Taiwan to ASML in the Netherlands — has become a primary driver of great power competition. The US CHIPS Act, China's self-sufficiency push, and India's semiconductor ambitions are reshaping industrial policy globally. This lesson also covers the battle for digital standards: 5G infrastructure, AI governance, and the splinternet.",
    tags: ["Technology", "Semiconductors", "US-China"],
  },
  {
    id: 5,
    dayNumber: 5,
    title: "The New Non-Alignment: Global South & BRICS+",
    date: "March 5, 2026",
    readTime: "8 min read",
    content:
      "As the West pressures nations to choose sides in the new Cold War, a growing number of countries in Asia, Africa, and Latin America are asserting strategic autonomy. BRICS's expansion to include Saudi Arabia, UAE, Ethiopia, Egypt, Iran, and Argentina reflects this trend. This lesson explores whether the Global South's non-alignment is a coherent strategic position or opportunistic balancing — and what it means for international institutions and Western-led order.",
    tags: ["BRICS", "Global South", "Multipolarity"],
  },
  {
    id: 6,
    dayNumber: 6,
    title: "India's Strategic Moment: Balancing Powers",
    date: "March 6, 2026",
    readTime: "12 min read",
    content:
      "India stands at a unique geopolitical crossroads. The world's most populous nation, the 5th largest economy, and a founding member of the Non-Aligned Movement, India today practices what Prime Minister Modi calls 'strategic autonomy.' It is simultaneously a member of QUAD (with US, Japan, Australia), a member of SCO (with China, Russia), and a founding BRICS member. This lesson dissects India's multi-vector foreign policy and its vision for a reformed multilateral order.",
    tags: ["India", "Strategic Autonomy", "Geopolitics"],
  },
];

export default function Geopolitics() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { isLoading } = useGetAllGeopoliticsLessons();
  const [authModal, setAuthModal] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <main className="pt-24 pb-20">
      <AuthModal
        open={authModal}
        mode="login"
        onClose={() => setAuthModal(false)}
        onSwitchMode={() => {}}
      />

      {/* Header */}
      <section
        className="py-16 px-4 sm:px-6 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.03 243) 0%, oklch(0.14 0.028 243) 100%)",
        }}
      >
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
              Daily Learning
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Geopolitics Day-by-Day
            </h1>
            <p className="text-muted-foreground font-sans text-lg max-w-xl mx-auto">
              One lesson a day. Build deep strategic knowledge over time.
            </p>
          </motion.div>
        </div>
      </section>

      {!isAuthenticated ? (
        <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border p-7 mb-6"
            style={{
              backgroundColor: "oklch(0.22 0.008 240)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-sans font-bold text-primary-foreground bg-gold rounded-full px-3 py-1">
                Day 1
              </span>
              <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                <Calendar className="w-3 h-3" /> March 1, 2026
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
              {mockLessons[0].title}
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed line-clamp-3">
              {mockLessons[0].content}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border text-center p-12"
            style={{
              backgroundColor: "oklch(0.19 0.028 243)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
            data-ocid="geopolitics.auth_gate.card"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.15)" }}
            >
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
              Unlock All Lessons
            </h3>
            <p className="text-muted-foreground font-sans max-w-md mx-auto mb-6">
              Sign in to access all 365+ daily geopolitics lessons. Build your
              understanding of world affairs systematically.
            </p>
            <Button
              onClick={() => setAuthModal(true)}
              size="lg"
              className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-full px-8"
              data-ocid="geopolitics.login.button"
            >
              Sign In to Continue
            </Button>
          </motion.div>
        </section>
      ) : (
        <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-14">
          {isLoading && (
            <div
              className="text-center py-12 text-muted-foreground font-sans"
              data-ocid="geopolitics.loading_state"
            >
              Loading lessons...
            </div>
          )}
          <div className="space-y-4">
            {mockLessons.map((lesson, i) => (
              <motion.article
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.22 0.008 240)",
                  borderColor: "oklch(0.28 0.028 243)",
                }}
                data-ocid={`geopolitics.item.${i + 1}`}
              >
                <button
                  type="button"
                  className="w-full p-6 text-left cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === lesson.id ? null : lesson.id)
                  }
                  aria-expanded={expandedId === lesson.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-sans font-bold text-primary-foreground bg-gold rounded-full px-3 py-1">
                          Day {lesson.dayNumber}
                        </span>
                        <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {lesson.date}
                        </span>
                        <span className="text-xs text-muted-foreground font-sans flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lesson.readTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl font-bold text-foreground">
                        {lesson.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {lesson.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-sans px-2 py-0.5 rounded-full text-muted-foreground"
                            style={{ backgroundColor: "oklch(0.28 0.028 243)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-muted-foreground shrink-0">
                      {expandedId === lesson.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </button>
                {expandedId === lesson.id && (
                  <div
                    className="px-6 pb-6 border-t"
                    style={{ borderColor: "oklch(0.28 0.028 243)" }}
                  >
                    <p className="text-muted-foreground font-sans leading-relaxed pt-5">
                      {lesson.content}
                    </p>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
