import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Crown,
  ExternalLink,
  HelpCircle,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Send,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { isAdminPrincipal } from "../lib/adminUtils";

interface ZoomMeeting {
  id: bigint;
  title: string;
  scheduledDate: bigint;
  description: string;
  zoomLink: string;
  meetingId?: string;
  passcode?: string;
}

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function getMonthLabel(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function getPlaceholderMeetings(): ZoomMeeting[] {
  const march = new Date(2026, 2, 20, 18, 0, 0);
  const april = new Date(2026, 3, 15, 18, 0, 0);
  const may = new Date(2026, 4, 15, 18, 0, 0);

  return [
    {
      id: BigInt(0),
      title: "Monthly Live Session \u2014 March 2026",
      description: "This session has ended.",
      scheduledDate: BigInt(march.getTime()) * 1_000_000n,
      zoomLink: "",
      meetingId: "869 9990 0653",
      passcode: "8X5m6i",
    },
    {
      id: BigInt(1),
      title: "Monthly Live Session \u2014 April 2026",
      description:
        "Join Advay Tyagi for a live Q&A, current affairs deep-dive, and strategic discussion.",
      scheduledDate: BigInt(april.getTime()) * 1_000_000n,
      zoomLink:
        "https://us05web.zoom.us/j/89666915566?pwd=vppxZiDYsBF0LW9b44CPbME9ohIKL4.1",
      meetingId: "896 6691 5566",
      passcode: "DAj6T8",
    },
    {
      id: BigInt(2),
      title: "Monthly Live Session \u2014 May 2026",
      description:
        "Join Advay Tyagi for a live Q&A, current affairs deep-dive, and strategic discussion. Link will be shared closer to the session date.",
      scheduledDate: BigInt(may.getTime()) * 1_000_000n,
      zoomLink: "",
    },
  ];
}

const faqs = [
  {
    question: "Will Advay be taking the class himself?",
    answer: "Yes, all sessions are conducted by Advay Tyagi himself.",
  },
  {
    question: "Will I get free e-books with my subscription?",
    answer:
      "Yes, you get free e-books included with your \u20b9500/year subscription.",
  },
  {
    question: "How will I know about new meetings?",
    answer:
      "Visit the Zoom Meetings tab on the website \u2014 all upcoming sessions are listed there with dates and links.",
  },
  {
    question: "What is the membership fee?",
    answer:
      "The membership is \u20b9500 per year, giving you access to all monthly live sessions and free e-books.",
  },
  {
    question: "How do I pay for the membership?",
    answer:
      "Pay via UPI to 9582376290@ptaxis. After payment, share your name (the name you will use to join the Zoom meeting) and a screenshot of the payment on WhatsApp at 9220561379.",
  },
  {
    question: "How do I join a Zoom meeting?",
    answer:
      'Click the "Join Meeting" button and the Zoom app will open automatically. Make sure you have Zoom installed.',
  },
  {
    question: "What happens in the monthly sessions?",
    answer:
      "Each session includes a live Q&A, current affairs deep-dive, and strategic geopolitics discussion with Advay Tyagi. Sessions typically run 60\u201390 minutes.",
  },
  {
    question: "Can I access recordings of past sessions?",
    answer:
      "Recordings may be shared with members at the discretion of Advay Tyagi Academy. Stay tuned to the platform for any updates on recorded content.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "oklch(0.22 0.008 240)",
        borderColor: open
          ? "oklch(0.72 0.11 74 / 0.5)"
          : "oklch(0.28 0.028 243)",
        transition: "border-color 0.2s ease",
      }}
      data-ocid={`faq.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-4 p-5 text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
        >
          <HelpCircle
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.11 74)" }}
          />
        </div>
        <span className="flex-1 font-serif text-base font-semibold text-foreground group-hover:text-gold transition-colors">
          {question}
        </span>
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.1)" }}
        >
          {open ? (
            <ChevronUp
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.11 74)" }}
            />
          ) : (
            <ChevronDown
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.11 74)" }}
            />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1 text-sm font-sans text-muted-foreground leading-relaxed"
              style={{ borderTop: "1px solid oklch(0.28 0.028 243)" }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const displayName = name.trim() || "Anonymous";
    const text = `Feedback from ${displayName}: ${message.trim()}`;
    const url = `https://wa.me/919220561379?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setName("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: faqs.length * 0.07 + 0.25 }}
      className="mt-5 rounded-2xl border p-6"
      style={{
        backgroundColor: "oklch(0.22 0.008 240)",
        borderColor: "oklch(0.28 0.028 243)",
      }}
      data-ocid="faq.feedback.card"
    >
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
        >
          <MessageCircle
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.11 74)" }}
          />
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground">
          Share Your Feedback
        </h3>
      </div>
      <p className="text-sm text-muted-foreground font-sans mb-5 ml-12">
        Your feedback helps improve the academy. We&apos;d love to hear from
        you.
      </p>

      <AnimatePresence>
        {submitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4"
            style={{
              backgroundColor: "oklch(0.55 0.18 145 / 0.12)",
              border: "1px solid oklch(0.55 0.18 145 / 0.3)",
            }}
            data-ocid="faq.feedback.success_state"
          >
            <CheckCircle2
              className="w-4 h-4 shrink-0"
              style={{ color: "oklch(0.65 0.18 145)" }}
            />
            <span
              className="text-sm font-sans font-medium"
              style={{ color: "oklch(0.75 0.14 145)" }}
            >
              Thanks for your feedback!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-xl px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "oklch(0.19 0.028 243)",
            border: "1px solid oklch(0.28 0.028 243)",
          }}
          data-ocid="faq.feedback.input"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback or suggestions..."
          rows={4}
          required
          className="w-full rounded-xl px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 transition-all resize-none"
          style={{
            backgroundColor: "oklch(0.19 0.028 243)",
            border: "1px solid oklch(0.28 0.028 243)",
          }}
          data-ocid="faq.feedback.textarea"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            data-ocid="faq.feedback.submit_button"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            Send Feedback
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function FAQsView() {
  return (
    <section className="px-4 sm:px-6 max-w-3xl mx-auto mt-10">
      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            index={i}
          />
        ))}
      </div>

      {/* Contact card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: faqs.length * 0.07 + 0.1 }}
        className="mt-6 rounded-2xl border p-6"
        style={{
          backgroundColor: "oklch(0.22 0.008 240)",
          borderColor: "oklch(0.28 0.028 243)",
        }}
        data-ocid="faq.contact.card"
      >
        <h3 className="font-serif text-xl font-bold text-foreground mb-1">
          Still have questions?
        </h3>
        <p className="text-sm text-muted-foreground font-sans mb-5">
          Reach out to us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/919220561379"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:border-gold/50 group"
            style={{
              backgroundColor: "oklch(0.19 0.028 243)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
            data-ocid="faq.whatsapp.link"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "oklch(0.55 0.18 145 / 0.15)" }}
            >
              <MessageCircle
                className="w-4 h-4"
                style={{ color: "oklch(0.65 0.18 145)" }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans">
                WhatsApp
              </p>
              <p className="text-sm font-sans font-semibold text-foreground group-hover:text-gold transition-colors">
                9220561379
              </p>
            </div>
          </a>
          <a
            href="mailto:advaytyagi55@gmail.com"
            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:border-gold/50 group"
            style={{
              backgroundColor: "oklch(0.19 0.028 243)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
            data-ocid="faq.email.link"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
            >
              <Mail
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.11 74)" }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans">Email</p>
              <p className="text-sm font-sans font-semibold text-foreground group-hover:text-gold transition-colors">
                advaytyagi55@gmail.com
              </p>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Feedback form card */}
      <FeedbackForm />

      <div className="pb-8" />
    </section>
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
        backgroundColor: "oklch(0.19 0.028 243)",
        borderColor: "oklch(0.72 0.11 74 / 0.3)",
      }}
      data-ocid="zoom.premium_gate.card"
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
        Complete your payment to unlock access to all Zoom Meeting sessions.
      </p>

      <Button
        asChild
        size="lg"
        className="font-sans font-semibold rounded-full px-10 py-5 text-base"
        style={{
          backgroundColor: "oklch(0.72 0.11 74)",
          color: "oklch(0.12 0.028 243)",
        }}
        data-ocid="zoom.goto_payment.button"
      >
        <Link to="/payment">Go to Payment</Link>
      </Button>
    </motion.div>
  );
}

function MeetingsView() {
  const { actor, isFetching } = useActor();

  const { data: meetings, isLoading } = useQuery<ZoomMeeting[]>({
    queryKey: ["zoomMeetings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllZoomMeetings();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });

  const displayMeetings =
    meetings && meetings.length > 0 ? meetings : getPlaceholderMeetings();

  const grouped = displayMeetings.reduce(
    (acc, meeting) => {
      const label = getMonthLabel(meeting.scheduledDate);
      if (!acc[label]) acc[label] = [];
      acc[label].push(meeting);
      return acc;
    },
    {} as Record<string, ZoomMeeting[]>,
  );

  return (
    <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-6">
      {/* Payment notice banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border flex gap-4 items-center justify-between p-5 mb-8 flex-wrap"
        style={{
          backgroundColor: "oklch(0.72 0.11 74 / 0.08)",
          borderColor: "oklch(0.72 0.11 74 / 0.35)",
        }}
        data-ocid="zoom.notice.card"
      >
        <p
          className="text-sm font-sans leading-relaxed flex-1"
          style={{ color: "oklch(0.85 0.06 74)" }}
        >
          <span className="font-semibold text-gold">
            Premium Access Required
          </span>{" "}
          — Complete your payment to join live Zoom sessions each month.
        </p>
        <Button
          asChild
          size="sm"
          className="font-sans font-semibold rounded-full px-6 shrink-0"
          style={{
            backgroundColor: "oklch(0.72 0.11 74)",
            color: "oklch(0.12 0.028 243)",
          }}
          data-ocid="zoom.notice.goto_payment.button"
        >
          <Link to="/payment">Go to Payment</Link>
        </Button>
      </motion.div>

      {isLoading && (
        <div
          className="text-center py-12 text-muted-foreground font-sans"
          data-ocid="zoom.loading_state"
        >
          Loading sessions...
        </div>
      )}

      {!isLoading &&
        Object.entries(grouped).map(([month, items], gi) => (
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            className="mb-10"
          >
            <h2
              className="font-serif text-xl font-bold mb-5 pb-3 border-b"
              style={{
                color: "oklch(0.72 0.11 74)",
                borderColor: "oklch(0.28 0.028 243)",
              }}
            >
              {month}
            </h2>
            <div className="flex flex-col gap-5">
              {items.map((meeting, i) => (
                <article
                  key={String(meeting.id)}
                  className="rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center gap-5"
                  style={{
                    backgroundColor: "oklch(0.22 0.008 240)",
                    borderColor: "oklch(0.28 0.028 243)",
                  }}
                  data-ocid={`zoom.item.${gi * 10 + i + 1}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.12)" }}
                  >
                    <Video className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      {meeting.title}
                    </h3>
                    <p className="text-xs text-gold font-sans mb-2">
                      {formatDate(meeting.scheduledDate)}
                    </p>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {meeting.description}
                    </p>
                    {(meeting.meetingId || meeting.passcode) && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {meeting.meetingId && (
                          <span
                            className="text-xs font-sans font-medium px-3 py-1 rounded-full border"
                            style={{
                              backgroundColor: "oklch(0.72 0.11 74 / 0.1)",
                              borderColor: "oklch(0.72 0.11 74 / 0.3)",
                              color: "oklch(0.72 0.11 74)",
                            }}
                          >
                            Meeting ID: {meeting.meetingId}
                          </span>
                        )}
                        {meeting.passcode && (
                          <span
                            className="text-xs font-sans font-medium px-3 py-1 rounded-full border"
                            style={{
                              backgroundColor: "oklch(0.72 0.11 74 / 0.1)",
                              borderColor: "oklch(0.72 0.11 74 / 0.3)",
                              color: "oklch(0.72 0.11 74)",
                            }}
                          >
                            Passcode: {meeting.passcode}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0">
                    {meeting.zoomLink ? (
                      <Button
                        asChild
                        size="sm"
                        className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-lg"
                        data-ocid={`zoom.join.button.${gi * 10 + i + 1}`}
                      >
                        <a
                          href={meeting.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> Join Meeting
                        </a>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        size="sm"
                        className="font-sans font-semibold rounded-lg opacity-50"
                        style={{
                          backgroundColor: "oklch(0.28 0.028 243)",
                          color: "oklch(0.6 0.02 243)",
                        }}
                        data-ocid={`zoom.join.button.${gi * 10 + i + 1}`}
                      >
                        Link Coming Soon
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
    </section>
  );
}

export default function ZoomMeetings() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const fullPrincipal = identity ? identity.getPrincipal().toString() : null;
  const isAdminLocal = isAdminPrincipal(fullPrincipal);
  const { actor, isFetching } = useActor();
  const [authModal, setAuthModal] = useState(false);

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

  function MeetingsContent() {
    if (!isAuthenticated) {
      return (
        <section className="px-4 sm:px-6 max-w-xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border text-center p-12"
            style={{
              backgroundColor: "oklch(0.19 0.028 243)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
            data-ocid="zoom.auth_gate.card"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "oklch(0.72 0.11 74 / 0.15)" }}
            >
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
              Sign In to View Meeting Links
            </h3>
            <p className="text-muted-foreground font-sans max-w-sm mx-auto mb-6">
              Meeting links are shared exclusively with registered members of
              Advay Tyagi Academy.
            </p>
            <Button
              onClick={() => setAuthModal(true)}
              size="lg"
              className="bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-full px-8"
              data-ocid="zoom.login.button"
            >
              Sign In to Access
            </Button>
          </motion.div>
        </section>
      );
    }
    if (premiumLoading) {
      return (
        <div
          className="flex items-center justify-center py-24"
          data-ocid="zoom.meetings.loading_state"
        >
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      );
    }
    if (!isPremium && !isAdminLocal) {
      return (
        <section className="px-4 sm:px-6 max-w-xl mx-auto mt-10">
          <PremiumLockedGate />
        </section>
      );
    }
    return <MeetingsView />;
  }

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
              Live Sessions
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Zoom Meetings
            </h1>
            <p className="text-muted-foreground font-sans text-lg max-w-xl mx-auto">
              Monthly live sessions with Advay Tyagi &mdash; Q&amp;A, current
              affairs breakdowns, and strategic discussions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        <Tabs defaultValue="meetings" data-ocid="zoom.tab">
          <TabsList
            className="w-full max-w-xs mx-auto flex rounded-full p-1 mb-2"
            style={{
              backgroundColor: "oklch(0.22 0.008 240)",
              border: "1px solid oklch(0.28 0.028 243)",
            }}
          >
            <TabsTrigger
              value="meetings"
              className="flex-1 rounded-full text-sm font-sans font-semibold transition-all data-[state=active]:shadow-sm"
              style={{
                color: "oklch(0.65 0.02 243)",
              }}
              data-ocid="zoom.meetings.tab"
            >
              <Video className="w-3.5 h-3.5 mr-1.5" />
              Meetings
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="flex-1 rounded-full text-sm font-sans font-semibold transition-all data-[state=active]:shadow-sm"
              style={{
                color: "oklch(0.65 0.02 243)",
              }}
              data-ocid="zoom.faqs.tab"
            >
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meetings">
            <MeetingsContent />
          </TabsContent>

          <TabsContent value="faqs">
            <FAQsView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
