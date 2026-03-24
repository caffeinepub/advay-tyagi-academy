import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { BookOpen, Crown, Loader2, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { isAdminPrincipal } from "../lib/adminUtils";

function ComingSoonPlaceholder({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl border"
      style={{
        backgroundColor: "oklch(0.17 0.028 243)",
        borderColor: "oklch(0.28 0.028 243)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.1)" }}
      >
        <BookOpen className="w-7 h-7 text-gold" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
        {label}
      </h2>
      <p className="text-muted-foreground font-sans text-sm max-w-md">
        Content for this section is coming soon. Stay tuned!
      </p>
    </motion.div>
  );
}

function PremiumGate({ onLogin }: { onLogin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl border"
      style={{
        backgroundColor: "oklch(0.17 0.028 243)",
        borderColor: "oklch(0.28 0.028 243)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
      >
        <Lock className="w-7 h-7 text-gold" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
        Premium Members Only
      </h2>
      <p className="text-muted-foreground font-sans text-sm max-w-md mb-2">
        This e-book is exclusively available to premium subscribers (₹500/year).
      </p>
      <div className="flex flex-col gap-1.5 text-xs font-sans text-muted-foreground mb-6">
        <span className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          Handwritten notes with verified, accurate knowledge
        </span>
        <span className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          No downloading permitted — read online only
        </span>
        <span className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          Exclusive access with premium membership
        </span>
      </div>
      <Button
        onClick={onLogin}
        className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-full px-8"
      >
        Log In to Access
      </Button>
      <Link
        to="/payment"
        className="mt-3 inline-flex items-center justify-center px-6 py-2 rounded-full border text-sm font-sans font-semibold transition-colors hover:bg-card"
        style={{
          borderColor: "oklch(0.72 0.11 74 / 0.4)",
          color: "oklch(0.72 0.11 74)",
        }}
        data-ocid="ebooks.goto_payment.link"
      >
        Go to Payment
      </Link>
    </motion.div>
  );
}

function PremiumLockedGate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl border"
      style={{
        backgroundColor: "oklch(0.17 0.028 243)",
        borderColor: "oklch(0.72 0.11 74 / 0.3)",
      }}
      data-ocid="ebooks.premium_gate.card"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.15)" }}
      >
        <Crown className="w-7 h-7 text-gold" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
        Premium Access Required
      </h2>
      <p className="text-muted-foreground font-sans text-sm max-w-md mb-8">
        Complete your payment to unlock premium access to all E-Books.
      </p>

      <Button
        asChild
        size="lg"
        className="font-sans font-semibold rounded-full px-10 py-5 text-base"
        style={{
          backgroundColor: "oklch(0.72 0.11 74)",
          color: "oklch(0.12 0.028 243)",
        }}
        data-ocid="ebooks.goto_payment.button"
      >
        <Link to="/payment">Go to Payment</Link>
      </Button>
    </motion.div>
  );
}

function WarsPdfViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-sans"
        style={{
          backgroundColor: "oklch(0.72 0.11 74 / 0.08)",
          borderColor: "oklch(0.72 0.11 74 / 0.25)",
          color: "oklch(0.72 0.11 74)",
        }}
      >
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          <strong>No downloading permitted.</strong> This content is for online
          reading only. Sharing or distributing this material is strictly
          prohibited.
        </span>
      </div>

      <div
        className="px-6 py-4 rounded-xl border"
        style={{
          backgroundColor: "oklch(0.19 0.028 243)",
          borderColor: "oklch(0.28 0.028 243)",
        }}
      >
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            Chapter 1 — Wars & Terrorist Attacks Handled by India
          </h3>
          <p className="text-xs font-sans text-gold mt-0.5">
            Advay Tyagi Academy · Handwritten · Verified Knowledge
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Handwritten notes",
              "100% accurate",
              "Premium exclusive",
              "No downloads",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full font-sans"
                style={{
                  backgroundColor: "oklch(0.72 0.11 74 / 0.12)",
                  color: "oklch(0.72 0.11 74)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "oklch(0.28 0.028 243)" }}
      >
        <iframe
          src="/assets/uploads/CHAPTER-1-WARS-1-1.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="Chapter 1 – Wars and Terrorist Attacks Handled by India"
          className="w-full"
          style={{ height: "80vh", minHeight: 500 }}
        />
      </div>
    </motion.div>
  );
}

function MiddleEastPdfViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-sans"
        style={{
          backgroundColor: "oklch(0.72 0.11 74 / 0.08)",
          borderColor: "oklch(0.72 0.11 74 / 0.25)",
          color: "oklch(0.72 0.11 74)",
        }}
      >
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          <strong>No downloading permitted.</strong> This content is for online
          reading only. Sharing or distributing this material is strictly
          prohibited.
        </span>
      </div>

      <div
        className="px-6 py-4 rounded-xl border"
        style={{
          backgroundColor: "oklch(0.19 0.028 243)",
          borderColor: "oklch(0.28 0.028 243)",
        }}
      >
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            Chapter 1 — Middle East: The Famous Conflict
          </h3>
          <p className="text-xs font-sans text-gold mt-0.5">
            Advay Tyagi Academy · Handwritten · Verified Knowledge
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Handwritten notes",
              "100% accurate",
              "Premium exclusive",
              "No downloads",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full font-sans"
                style={{
                  backgroundColor: "oklch(0.72 0.11 74 / 0.12)",
                  color: "oklch(0.72 0.11 74)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "oklch(0.28 0.028 243)" }}
      >
        <iframe
          src="/assets/uploads/CHAPTER-1-MIDDLE-EAST-_compressed-2--1.pdf#toolbar=0&navpanes=0&scrollbar=1"
          title="Chapter 1 – Middle East: The Famous Conflict"
          className="w-full"
          style={{ height: "80vh", minHeight: 500 }}
        />
      </div>
    </motion.div>
  );
}

export default function Ebooks() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const fullPrincipal = identity ? identity.getPrincipal().toString() : null;
  const isAdminLocal = isAdminPrincipal(fullPrincipal);
  const { actor, isFetching } = useActor();
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);

  const { data: isPremium, isLoading: premiumLoading } = useQuery({
    queryKey: ["isPremium"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        const [premium, admin] = await Promise.all([
          (
            actor as unknown as { isCallerPremium: () => Promise<boolean> }
          ).isCallerPremium(),
          (
            actor as unknown as { isCallerAdmin: () => Promise<boolean> }
          ).isCallerAdmin(),
        ]);
        return premium || admin;
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated && !isAdminLocal,
    initialData: false,
  });

  function WarsContent() {
    if (!isAuthenticated) {
      return <PremiumGate onLogin={() => setAuthModal("login")} />;
    }
    if (premiumLoading) {
      return (
        <div
          className="flex items-center justify-center py-24"
          data-ocid="ebooks.wars.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      );
    }
    if (!isPremium && !isAdminLocal) {
      return <PremiumLockedGate />;
    }
    return <WarsPdfViewer />;
  }

  function MiddleEastContent() {
    if (!isAuthenticated) {
      return <PremiumGate onLogin={() => setAuthModal("login")} />;
    }
    if (premiumLoading) {
      return (
        <div
          className="flex items-center justify-center py-24"
          data-ocid="ebooks.middleeast.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      );
    }
    if (!isPremium && !isAdminLocal) {
      return <PremiumLockedGate />;
    }
    return <MiddleEastPdfViewer />;
  }

  return (
    <main className="pt-24 pb-20">
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
            <p className="text-muted-foreground font-sans text-base max-w-xl mx-auto">
              Curated geopolitics reading by Advay Tyagi. Browse by category
              below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 max-w-6xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-5">
            All General Knowledge
          </p>

          <Tabs defaultValue="personalities" data-ocid="ebooks.tab">
            <TabsList
              className="flex flex-wrap h-auto gap-2 p-1.5 mb-8 w-full sm:w-auto"
              style={{
                backgroundColor: "oklch(0.19 0.028 243)",
                border: "1px solid oklch(0.28 0.028 243)",
              }}
            >
              <TabsTrigger
                value="personalities"
                className="text-sm font-sans data-[state=active]:text-foreground"
                data-ocid="ebooks.personalities.tab"
              >
                Famous Personalities
              </TabsTrigger>
              <TabsTrigger
                value="wars"
                className="text-sm font-sans data-[state=active]:text-foreground"
                data-ocid="ebooks.wars.tab"
              >
                Wars &amp; Terrorist Attacks Handled by India
              </TabsTrigger>
              <TabsTrigger
                value="middleeast"
                className="text-sm font-sans data-[state=active]:text-foreground"
                data-ocid="ebooks.middleeast.tab"
              >
                Middle East – The Famous Conflict
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personalities">
              <ComingSoonPlaceholder label="Famous Personalities" />
            </TabsContent>

            <TabsContent value="wars">
              <WarsContent />
            </TabsContent>

            <TabsContent value="middleeast">
              <MiddleEastContent />
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      <AuthModal
        open={authModal !== null}
        mode={authModal ?? "login"}
        onClose={() => setAuthModal(null)}
        onSwitchMode={(m) => setAuthModal(m)}
      />
    </main>
  );
}
