import { Construction } from "lucide-react";
import { motion } from "motion/react";

export default function Ebooks() {
  return (
    <main className="pt-24 pb-20">
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
              Digital Library
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              E-Books Library
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Under Construction */}
      <section className="px-4 sm:px-6 max-w-2xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border text-center p-14"
          style={{
            backgroundColor: "oklch(0.19 0.028 243)",
            borderColor: "oklch(0.28 0.028 243)",
          }}
          data-ocid="ebooks.under_construction.card"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
          >
            <Construction className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            Coming Soon
          </h2>
          <p className="text-muted-foreground font-sans text-base leading-relaxed max-w-sm mx-auto">
            Our e-books library is currently under construction. Check back soon
            for curated geopolitics reading by Advay Tyagi.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
