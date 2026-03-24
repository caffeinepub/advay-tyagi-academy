import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FAQS = [
  {
    q: "What is Advay Tyagi Academy?",
    a: "Advay Tyagi Academy is a premier educational platform focused on geopolitics, history, and current affairs. We offer daily geopolitics lessons, premium e-books, live Zoom sessions, and structured courses on Modern History — all taught by expert educator Advay Tyagi.",
  },
  {
    q: "How do I get premium access?",
    a: "To get premium access, go to the Payment tab, fill in your details, and pay ₹500/year via UPI (9582376290@ptaxis). After payment, click 'Confirm & Pay' to send your payment details to our admin via WhatsApp. Premium access will be granted manually within a short time.",
  },
  {
    q: "What is included in the Masterclass membership?",
    a: "The ₹500/year Masterclass membership gives you full access to our premium E-Books library (handwritten, exclusive, accurate notes), live Zoom meeting sessions grouped by month, and all future premium content added to the platform.",
  },
  {
    q: "How do I join Zoom meetings?",
    a: "Once you have premium access, navigate to the 'Zoom Meetings' tab. You will find all scheduled sessions listed by month with their Meeting ID, passcode, and a direct join link. Click the link to join directly in your Zoom app or browser.",
  },
  {
    q: "How do I access E-Books?",
    a: "E-Books are available to premium members only. After purchasing the ₹500/year membership, go to the 'E-Books' tab to read our exclusive handwritten notes on Wars & Terrorist Attacks, Middle East conflicts, and upcoming content on Famous Personalities.",
  },
  {
    q: "Are the courses different from the Masterclass membership?",
    a: "Yes! Courses (Indian Modern History & European Modern History) are standalone recorded courses priced at ₹699 each. They include 3.5+ hours of content, handwritten notes, PDF downloads, and live doubt sessions. These are separate from the ₹500/year Masterclass membership.",
  },
  {
    q: "Can I get a refund?",
    a: "Since all content is digital and immediately accessible after payment, we generally do not offer refunds. However, if you face any technical issues or have not received access within 24 hours of payment, please contact us on WhatsApp at 9220561379 and we will resolve it promptly.",
  },
  {
    q: "How do I contact support?",
    a: "For any queries, reach out to us on WhatsApp at 9220561379 or email advaytyagi55@gmail.com. We typically respond within a few hours.",
  },
];

export default function FAQs() {
  const [feedback, setFeedback] = useState({ name: "", message: "" });

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.message.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }
    const msg = encodeURIComponent(
      `Feedback from ${feedback.name}:\n\n${feedback.message}`,
    );
    window.open(`https://wa.me/919220561379?text=${msg}`, "_blank");
    setFeedback({ name: "", message: "" });
    toast.success("Opening WhatsApp with your feedback!");
  };

  return (
    <main className="pt-20 pb-16 min-h-screen" data-ocid="faqs.page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center pt-10 mb-12">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-gold mb-5"
            style={{ backgroundColor: "oklch(0.19 0.03 243)" }}
          >
            <HelpCircle className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-serif text-4xl text-gold mb-3">FAQs</h1>
          <p className="font-sans text-muted-foreground">
            Answers to common questions about Advay Tyagi Academy.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16" data-ocid="faqs.list">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="rounded-xl border px-2 overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.17 0.025 243)",
                  borderColor: "oklch(0.26 0.028 243)",
                }}
                data-ocid={`faqs.item.${i + 1}`}
              >
                <AccordionTrigger className="font-sans text-sm font-medium text-foreground hover:text-gold px-3 py-4 text-left hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground leading-relaxed px-3 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Feedback Form */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: "oklch(0.17 0.025 243)",
            borderColor: "oklch(0.36 0.08 74 / 0.5)",
            boxShadow: "0 0 30px oklch(0.72 0.11 74 / 0.08)",
          }}
          data-ocid="faqs.feedback.panel"
        >
          <div
            className="px-6 py-5 border-b flex items-center gap-3"
            style={{ borderColor: "oklch(0.26 0.028 243)" }}
          >
            <MessageCircle className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-foreground">
              Send Feedback
            </h2>
          </div>

          <form onSubmit={handleSendFeedback} className="px-6 py-6 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="fb-name"
                className="font-sans text-sm text-muted-foreground"
              >
                Your Name
              </Label>
              <Input
                id="fb-name"
                placeholder="Enter your name"
                value={feedback.name}
                onChange={(e) =>
                  setFeedback((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-card border-border font-sans text-sm"
                data-ocid="faqs.feedback.name.input"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="fb-message"
                className="font-sans text-sm text-muted-foreground"
              >
                Message
              </Label>
              <Textarea
                id="fb-message"
                placeholder="Share your feedback, suggestions, or queries..."
                rows={4}
                value={feedback.message}
                onChange={(e) =>
                  setFeedback((p) => ({ ...p, message: e.target.value }))
                }
                className="bg-card border-border font-sans text-sm resize-none"
                data-ocid="faqs.feedback.message.textarea"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-sans font-semibold"
              data-ocid="faqs.feedback.submit.button"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send via WhatsApp
            </Button>
            <p className="font-sans text-xs text-muted-foreground text-center">
              This will open WhatsApp with your message pre-filled to
              9220561379.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center space-y-2">
          <p className="font-sans text-sm text-muted-foreground">
            📱 WhatsApp:{" "}
            <a
              href="https://wa.me/919220561379"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              9220561379
            </a>
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            ✉️ Email:{" "}
            <a
              href="mailto:advaytyagi55@gmail.com"
              className="text-gold hover:underline"
            >
              advaytyagi55@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
