import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Lock, Video } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

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
  // First meeting: real March 2026 session
  const march = new Date(2026, 2, 20, 18, 0, 0); // March 20, 2026
  const april = new Date(2026, 3, 15, 18, 0, 0);
  const may = new Date(2026, 4, 15, 18, 0, 0);

  return [
    {
      id: BigInt(0),
      title: "Monthly Live Session \u2014 March 2026",
      description:
        "Join Advay Tyagi for a live Q&A, current affairs deep-dive, and strategic discussion.",
      scheduledDate: BigInt(march.getTime()) * 1_000_000n,
      zoomLink:
        "https://us05web.zoom.us/j/86999900653?pwd=N5RuGRLn1pbBPbFzbQh4adxWJcFBxb.1",
      meetingId: "869 9990 0653",
      passcode: "8X5m6i",
    },
    {
      id: BigInt(1),
      title: "Monthly Live Session \u2014 April 2026",
      description:
        "Join Advay Tyagi for a live Q&A, current affairs deep-dive, and strategic discussion. Link will be shared closer to the session date.",
      scheduledDate: BigInt(april.getTime()) * 1_000_000n,
      zoomLink: "",
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
    <section className="px-4 sm:px-6 max-w-4xl mx-auto mt-14">
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
  const [authModal, setAuthModal] = useState(false);

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

      {/* Auth gate */}
      {!isAuthenticated ? (
        <section className="px-4 sm:px-6 max-w-xl mx-auto mt-16">
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
      ) : (
        <MeetingsView />
      )}
    </main>
  );
}
