import { Link } from "@tanstack/react-router";
import { GraduationCap, Instagram, Mail, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "oklch(0.11 0.025 243)",
        borderColor: "oklch(0.22 0.028 243)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gold"
              style={{ backgroundColor: "oklch(0.19 0.03 243)" }}
            >
              <GraduationCap className="w-5 h-5 text-gold" />
            </div>
            <span className="font-serif font-semibold text-gold">
              Advay Tyagi Academy
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Empowering minds with world-class geopolitics education and
            strategic insight.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-4 uppercase tracking-widest">
            Navigate
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "Masterclasses", to: "/masterclasses" },
              { label: "Geopolitics Day-by-Day", to: "/geopolitics" },
              { label: "E-Books Library", to: "/ebooks" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors font-sans"
                  data-ocid="footer.link"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-4 uppercase tracking-widest">
            Contact
          </h4>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground font-sans">
              academy@advaytyagi.com
            </li>
            <li className="text-sm text-muted-foreground font-sans">
              New Delhi, India
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-sans font-semibold text-sm text-foreground mb-4 uppercase tracking-widest">
            Stay Updated
          </h4>
          <p className="text-sm text-muted-foreground font-sans mb-3">
            Get weekly geopolitics insights in your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-lg px-3 py-2 text-sm font-sans text-foreground border outline-none focus:border-gold transition-colors"
              style={{
                backgroundColor: "oklch(0.22 0.008 240)",
                borderColor: "oklch(0.28 0.028 243)",
              }}
              data-ocid="footer.input"
            />
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm font-sans font-semibold text-primary-foreground transition-colors hover:bg-gold-light"
              style={{ backgroundColor: "oklch(0.72 0.11 74)" }}
              data-ocid="footer.subscribe.button"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="border-t py-6 text-center"
        style={{ borderColor: "oklch(0.22 0.028 243)" }}
      >
        <p className="text-xs text-muted-foreground font-sans">
          © {year} Advay Tyagi Academy. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
