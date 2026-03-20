import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { GraduationCap, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Masterclasses", to: "/masterclasses" },
  { label: "Geopolitics", to: "/geopolitics" },
  { label: "E-Books", to: "/ebooks" },
  { label: "Zoom Meetings", to: "/zoom-meetings" },
];

export default function Navbar() {
  const { identity, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);

  const isAuthenticated = !!identity;
  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 10)}...`
    : null;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: "oklch(0.12 0.028 243)",
          borderColor: "oklch(0.22 0.028 243)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-gold"
              style={{ backgroundColor: "oklch(0.19 0.03 243)" }}
            >
              <GraduationCap className="w-5 h-5 text-gold" />
            </div>
            <span className="font-serif font-semibold text-sm sm:text-base text-gold leading-tight hidden sm:block">
              Advay Tyagi Academy
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm transition-colors ${
                  location.pathname === link.to
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-sans">{principalShort}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={loginStatus === "logging-in"}
                  className="border-border text-foreground hover:bg-card font-sans"
                  data-ocid="nav.logout.button"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAuthModal("login")}
                  className="border-border text-foreground hover:bg-card font-sans rounded-full px-5"
                  data-ocid="nav.login.button"
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setAuthModal("signup")}
                  className="bg-gold text-primary-foreground hover:bg-gold-light font-sans rounded-full px-5 font-semibold"
                  data-ocid="nav.signup.button"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
            style={{
              backgroundColor: "oklch(0.12 0.028 243)",
              borderColor: "oklch(0.22 0.028 243)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-border text-foreground hover:bg-card font-sans w-full"
                data-ocid="nav.logout.button"
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAuthModal("login");
                    setMobileOpen(false);
                  }}
                  className="border-border text-foreground font-sans w-full"
                  data-ocid="nav.login.button"
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setAuthModal("signup");
                    setMobileOpen(false);
                  }}
                  className="bg-gold text-primary-foreground font-sans w-full font-semibold"
                  data-ocid="nav.signup.button"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      <AuthModal
        open={authModal !== null}
        mode={authModal ?? "login"}
        onClose={() => setAuthModal(null)}
        onSwitchMode={(m) => setAuthModal(m)}
      />
    </>
  );
}
