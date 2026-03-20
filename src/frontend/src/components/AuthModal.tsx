import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface Props {
  open: boolean;
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

export default function AuthModal({
  open,
  mode,
  onClose,
  onSwitchMode,
}: Props) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (identity && open) {
      onClose();
    }
  }, [identity, open, onClose]);

  const handleLogin = async () => {
    try {
      await login();
      queryClient.invalidateQueries();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md border"
        style={{
          backgroundColor: "oklch(0.19 0.028 243)",
          borderColor: "oklch(0.28 0.028 243)",
        }}
        data-ocid="auth.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-gold">
            {mode === "login" ? "Welcome Back" : "Join the Academy"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-sans">
            {mode === "login"
              ? "Sign in with Internet Identity to access your courses and content."
              : "Create your account using Internet Identity — secure and decentralized."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4">
          <div
            className="rounded-lg p-4 text-sm text-muted-foreground font-sans border"
            style={{
              backgroundColor: "oklch(0.22 0.008 240)",
              borderColor: "oklch(0.28 0.028 243)",
            }}
          >
            <p className="mb-2 font-medium text-foreground">
              🔐 Internet Identity
            </p>
            <p>
              Advay Tyagi Academy uses the Internet Computer's Internet Identity
              for secure, passwordless authentication. No email or password
              required.
            </p>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light font-sans font-semibold rounded-lg h-11"
            data-ocid="auth.submit_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                Authenticating...
              </>
            ) : mode === "login" ? (
              "Sign In with Internet Identity"
            ) : (
              "Create Account with Internet Identity"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground font-sans">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchMode("signup")}
                  className="text-gold hover:underline"
                  data-ocid="auth.switch_mode.button"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchMode("login")}
                  className="text-gold hover:underline"
                  data-ocid="auth.switch_mode.button"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
