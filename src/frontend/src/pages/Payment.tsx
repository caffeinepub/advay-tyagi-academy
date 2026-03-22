import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Copy, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const COUPONS: Record<string, { discount: number; label: string }> = {
  GET20: { discount: 20, label: "GET20" },
  WAR25: { discount: 25, label: "WAR25" },
};

const BASE_PRICE = 500;

export default function Payment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Uttar Pradesh",
  });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<null | {
    code: string;
    discount: number;
  }>(null);
  const [couponError, setCouponError] = useState("");
  const [upiCopied, setUpiCopied] = useState(false);

  const isFormComplete =
    form.name.trim() && form.email.trim() && form.phone.trim() && form.state;

  const discountAmount = appliedCoupon
    ? Math.round((BASE_PRICE * appliedCoupon.discount) / 100)
    : 0;
  const finalAmount = BASE_PRICE - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    if (COUPONS[code]) {
      setAppliedCoupon({ code, discount: COUPONS[code].discount });
      setCouponError("");
      setCouponInput("");
      toast.success(`Coupon ${code} applied! ${COUPONS[code].discount}% off`);
    } else {
      setCouponError("Invalid coupon code. Please check and try again.");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
    toast.info("Coupon removed.");
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("9582376290@ptaxis").then(() => {
      setUpiCopied(true);
      toast.success("UPI ID copied!");
      setTimeout(() => setUpiCopied(false), 2500);
    });
  };

  const handleConfirmPay = () => {
    const msg = encodeURIComponent(
      `Hi, I have made the payment for Advay Tyagi Academy Masterclass.\nName: ${form.name}\nEmail: ${form.email}\nPhone: +91${form.phone}\nAmount Paid: ₹${finalAmount}\nCoupon Used: ${
        appliedCoupon ? appliedCoupon.code : "None"
      }`,
    );
    window.open(`https://wa.me/919220561379?text=${msg}`, "_blank");
  };

  return (
    <main className="pt-20 pb-16 min-h-screen" data-ocid="payment.page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="text-center mb-10 pt-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-gold mb-3">
            Complete Your Enrollment
          </h1>
          <p className="font-sans text-muted-foreground text-sm sm:text-base">
            Fill in your details below and pay via UPI to join the Masterclass.
          </p>
        </div>

        {/* Billing Form */}
        <div
          className="rounded-xl border mb-6 overflow-hidden"
          style={{
            backgroundColor: "oklch(0.17 0.025 243)",
            borderColor: "oklch(0.26 0.028 243)",
          }}
        >
          <div
            className="px-5 py-4 border-b"
            style={{ borderColor: "oklch(0.26 0.028 243)" }}
          >
            <h2 className="font-serif text-lg text-foreground">
              Billing Information
            </h2>
          </div>

          {/* Name */}
          <div
            className="flex items-center border-b px-5 py-3.5 gap-4"
            style={{ borderColor: "oklch(0.22 0.022 243)" }}
          >
            <Label
              htmlFor="name"
              className="font-sans text-sm text-muted-foreground w-28 shrink-0"
            >
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="border-0 bg-transparent font-sans text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 px-0"
              data-ocid="payment.name.input"
            />
          </div>

          {/* Email */}
          <div
            className="flex items-center border-b px-5 py-3.5 gap-4"
            style={{ borderColor: "oklch(0.22 0.022 243)" }}
          >
            <Label
              htmlFor="email"
              className="font-sans text-sm text-muted-foreground w-28 shrink-0"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="border-0 bg-transparent font-sans text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 px-0"
              data-ocid="payment.email.input"
            />
          </div>

          {/* Phone */}
          <div
            className="flex items-center border-b px-5 py-3.5 gap-4"
            style={{ borderColor: "oklch(0.22 0.022 243)" }}
          >
            <Label
              htmlFor="phone"
              className="font-sans text-sm text-muted-foreground w-28 shrink-0"
            >
              Phone
            </Label>
            <div className="flex items-center gap-2 flex-1">
              <span className="font-sans text-sm text-muted-foreground flex items-center gap-1 shrink-0">
                🇮🇳 +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    phone: e.target.value.replace(/\D/g, ""),
                  }))
                }
                className="border-0 bg-transparent font-sans text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 px-0"
                data-ocid="payment.phone.input"
              />
            </div>
          </div>

          {/* State */}
          <div className="flex items-center px-5 py-3.5 gap-4">
            <Label
              htmlFor="state"
              className="font-sans text-sm text-muted-foreground w-28 shrink-0"
            >
              State
            </Label>
            <Select
              value={form.state}
              onValueChange={(v) => setForm((p) => ({ ...p, state: v }))}
            >
              <SelectTrigger
                className="border-0 bg-transparent font-sans text-sm focus:ring-0 px-0 h-auto"
                data-ocid="payment.state.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: "oklch(0.19 0.028 243)",
                  borderColor: "oklch(0.28 0.028 243)",
                }}
              >
                {INDIAN_STATES.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="font-sans text-sm text-foreground focus:bg-white/10"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Coupon */}
        <div
          className="rounded-xl border mb-6 px-5 py-4"
          style={{
            backgroundColor: "oklch(0.17 0.025 243)",
            borderColor: "oklch(0.26 0.028 243)",
          }}
        >
          {appliedCoupon ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="w-4 h-4"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                />
                <span className="font-sans text-sm font-semibold text-foreground">
                  {appliedCoupon.code}
                </span>
                <span
                  className="font-sans text-sm"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                >
                  — {appliedCoupon.discount}% discount applied!
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="payment.coupon.remove.button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="border-0 bg-transparent font-sans text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 px-0 uppercase"
                    data-ocid="payment.coupon.input"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleApplyCoupon}
                  className="font-sans border-gold text-gold hover:bg-gold/10 shrink-0"
                  data-ocid="payment.coupon.apply.button"
                >
                  Apply Coupon
                </Button>
              </div>
              {couponError && (
                <p
                  className="font-sans text-xs mt-2"
                  style={{ color: "oklch(0.65 0.22 27)" }}
                  data-ocid="payment.coupon.error_state"
                >
                  {couponError}
                </p>
              )}
            </>
          )}
        </div>

        {/* Bill Summary */}
        <div
          className="rounded-xl border mb-6 overflow-hidden"
          style={{
            backgroundColor: "oklch(0.17 0.025 243)",
            borderColor: "oklch(0.26 0.028 243)",
          }}
        >
          {/* Wavy top border effect */}
          <div
            className="h-3 w-full"
            style={{
              background: "oklch(0.17 0.025 243)",
              backgroundImage:
                "radial-gradient(circle at 6px -2px, transparent 6px, oklch(0.72 0.11 74) 6px, oklch(0.72 0.11 74) 7px, oklch(0.17 0.025 243) 7px)",
              backgroundSize: "12px 12px",
              backgroundRepeat: "repeat-x",
              borderTop: "2px solid oklch(0.72 0.11 74)",
            }}
          />

          <div className="px-5 py-4">
            <h2 className="font-serif text-base text-gold mb-4">
              Bill Summary
            </h2>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-sans text-sm text-foreground font-medium">
                    Advay Tyagi Academy Masterclass
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Annual access — all content included
                  </p>
                </div>
                <span className="font-sans text-sm text-foreground font-semibold">
                  ₹{BASE_PRICE.toFixed(2)}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground">
                    Discount ({appliedCoupon.discount}%){" "}
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.72 0.11 74)" }}
                    >
                      [{appliedCoupon.code}]
                    </span>
                  </span>
                  <span
                    className="font-sans text-sm font-semibold"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  >
                    −₹{discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <Separator style={{ backgroundColor: "oklch(0.26 0.028 243)" }} />

              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-foreground">
                  Amount to be paid:
                </span>
                <span className="font-serif text-xl font-bold text-gold">
                  ₹{finalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* UPI Payment Section */}
        {isFormComplete ? (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              backgroundColor: "oklch(0.17 0.025 243)",
              borderColor: "oklch(0.36 0.08 74 / 0.6)",
              boxShadow: "0 0 24px oklch(0.72 0.11 74 / 0.12)",
            }}
            data-ocid="payment.upi.section"
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.26 0.028 243)" }}
            >
              <h2 className="font-serif text-lg text-gold">Pay via UPI</h2>
            </div>

            <div className="px-5 py-5 space-y-5">
              {/* UPI ID display */}
              <div
                className="rounded-lg border px-4 py-3 flex items-center justify-between gap-4"
                style={{
                  backgroundColor: "oklch(0.14 0.028 243)",
                  borderColor: "oklch(0.30 0.06 74 / 0.5)",
                }}
              >
                <div>
                  <p className="font-sans text-xs text-muted-foreground mb-1">
                    UPI ID
                  </p>
                  <p className="font-sans text-base font-bold text-gold tracking-wide">
                    9582376290@ptaxis
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUPI}
                  className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors border rounded-md px-2.5 py-1.5"
                  style={{ borderColor: "oklch(0.28 0.028 243)" }}
                  data-ocid="payment.upi_copy.button"
                >
                  {upiCopied ? (
                    <CheckCircle2
                      className="w-3.5 h-3.5"
                      style={{ color: "oklch(0.65 0.18 145)" }}
                    />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {upiCopied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Instructions */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Open any UPI app{" "}
                <span className="text-foreground">
                  (PhonePe, Paytm, GPay, etc.)
                </span>{" "}
                and pay{" "}
                <span className="text-gold font-semibold">
                  ₹{finalAmount.toFixed(2)}
                </span>{" "}
                to the above UPI ID. After payment, click the button below to
                notify us on WhatsApp.
              </p>

              {/* Confirm & Pay */}
              <Button
                onClick={handleConfirmPay}
                className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-sans font-semibold text-base py-5 rounded-xl"
                data-ocid="payment.confirm.primary_button"
              >
                ✅ Confirm & Pay — Notify on WhatsApp
              </Button>

              <p className="font-sans text-xs text-muted-foreground text-center">
                This will open WhatsApp with your payment details pre-filled.
                Admin will verify and grant you premium access.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl border px-5 py-4 flex items-center gap-3"
            style={{
              backgroundColor: "oklch(0.17 0.025 243)",
              borderColor: "oklch(0.26 0.028 243)",
            }}
            data-ocid="payment.incomplete.error_state"
          >
            <span className="text-lg">ℹ️</span>
            <p className="font-sans text-sm text-muted-foreground">
              Fill all details above to proceed to payment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
