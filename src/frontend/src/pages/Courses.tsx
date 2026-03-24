import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

const specialities = [
  { icon: Clock, text: "3.5+ hours of in-depth video content" },
  { icon: FileText, text: "Expert handwritten notes (exclusive)" },
  { icon: Users, text: "Live doubt-clearing sessions" },
  { icon: Video, text: "Recorded session access" },
  { icon: BookOpen, text: "Batch-wise structured teaching" },
  { icon: TrendingUp, text: "Current affairs integration" },
  { icon: Target, text: "Exam-focused strategy" },
];

const courses = [
  {
    id: "indian-modern-history",
    title: "Indian Modern History",
    subtitle: "From Colonial Rule to Independence",
    description:
      "A comprehensive deep-dive into Indian Modern History covering the colonial period, freedom struggle, key personalities, and post-independence India — crafted for competitive exams.",
    price: 699,
    batchDate: "16th April 2026",
    tag: "Most Popular",
  },
  {
    id: "european-modern-history",
    title: "European Modern History",
    subtitle: "Revolutions, Wars & the Modern World",
    description:
      "Master European Modern History from the French Revolution to the Cold War era. Covers major events, key figures, and geopolitical shifts that shaped the modern world.",
    price: 699,
    batchDate: "18th April 2026",
    tag: "New Batch",
  },
];

export default function Courses() {
  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span
          className="inline-block text-xs font-sans font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border"
          style={{
            color: "oklch(0.72 0.11 74)",
            borderColor: "oklch(0.72 0.11 74 / 0.3)",
            backgroundColor: "oklch(0.72 0.11 74 / 0.08)",
          }}
        >
          Advay Tyagi Academy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Our <span className="text-gold">Courses</span>
        </h1>
        <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-2xl mx-auto">
          In-depth, exam-focused history courses crafted by experts — designed
          to help you master every topic with clarity and confidence.
        </p>
      </motion.div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl border flex flex-col overflow-hidden"
            style={{
              backgroundColor: "oklch(0.17 0.028 243)",
              borderColor: "oklch(0.72 0.11 74 / 0.3)",
            }}
            data-ocid={`courses.item.${i + 1}`}
          >
            {/* Card Header */}
            <div
              className="px-6 pt-6 pb-5 border-b"
              style={{ borderColor: "oklch(0.72 0.11 74 / 0.15)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className="text-xs font-sans font-semibold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: "oklch(0.72 0.11 74)",
                    borderColor: "oklch(0.72 0.11 74 / 0.3)",
                    backgroundColor: "oklch(0.72 0.11 74 / 0.08)",
                  }}
                >
                  {course.tag}
                </span>
                <div className="text-right">
                  <p className="font-serif text-2xl font-bold text-gold">
                    ₹{course.price}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans">
                    per course
                  </p>
                </div>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1">
                {course.title}
              </h2>
              <p className="text-gold font-sans text-sm font-medium mb-3">
                {course.subtitle}
              </p>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {course.description}
              </p>
              <div
                className="mt-4 inline-flex items-center gap-2 text-xs font-sans px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "oklch(0.20 0.028 243)",
                  color: "oklch(0.75 0.06 74)",
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                First Batch:{" "}
                <span className="font-semibold text-gold">
                  {course.batchDate}
                </span>
              </div>
            </div>

            {/* Specialities */}
            <div className="px-6 py-5 flex-1">
              <p
                className="text-xs font-sans font-semibold tracking-widest uppercase mb-4"
                style={{ color: "oklch(0.72 0.11 74)" }}
              >
                What You Get
              </p>
              <ul className="flex flex-col gap-2.5">
                {specialities.map((spec) => (
                  <li key={spec.text} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "oklch(0.72 0.11 74)" }}
                    />
                    <span className="text-sm font-sans text-muted-foreground leading-snug">
                      {spec.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="px-6 pb-6 pt-4 border-t"
              style={{ borderColor: "oklch(0.72 0.11 74 / 0.15)" }}
            >
              <Button
                asChild
                className="w-full font-sans font-semibold rounded-full py-5 text-base"
                style={{
                  backgroundColor: "oklch(0.72 0.11 74)",
                  color: "oklch(0.12 0.028 243)",
                }}
                data-ocid={`courses.pay_now.button.${i + 1}`}
              >
                <a
                  href={`/payment?price=${course.price}&item=${encodeURIComponent(course.title)}`}
                >
                  Pay Now — ₹{course.price}
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-sm text-muted-foreground font-sans"
      >
        📅 More batches coming soon. Stay tuned!
      </motion.p>
    </main>
  );
}
