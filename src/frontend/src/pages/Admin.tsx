import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, ShieldCheck, ShieldX, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { isAdminPrincipal } from "../lib/adminUtils";

export default function Admin() {
  const { actor, isFetching } = useActor();
  const backendActor = actor as any;
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const queryClient = useQueryClient();
  const [principalInput, setPrincipalInput] = useState("");

  // Frontend-side admin check using hardcoded principal
  const principalStr = identity?.getPrincipal().toString();
  const isFrontendAdmin = isAdminPrincipal(principalStr);

  const { data: premiumUsers = [], isLoading: loadingUsers } = useQuery<
    Principal[]
  >({
    queryKey: ["premiumUsers"],
    queryFn: async () => {
      if (!backendActor) return [];
      try {
        return await backendActor.getAllPremiumUsers();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isFrontendAdmin,
  });

  const grantMutation = useMutation({
    mutationFn: async (principalStr: string) => {
      if (!backendActor) throw new Error("Not connected");
      const principal = Principal.fromText(principalStr);
      await backendActor.grantPremium(principal);
    },
    onSuccess: () => {
      toast.success("Premium access granted!");
      setPrincipalInput("");
      queryClient.invalidateQueries({ queryKey: ["premiumUsers"] });
    },
    onError: (err: Error) => {
      toast.error(`Failed: ${err.message}`);
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async (principal: Principal) => {
      if (!backendActor) throw new Error("Not connected");
      await backendActor.revokePremium(principal);
    },
    onSuccess: () => {
      toast.success("Premium access revoked.");
      queryClient.invalidateQueries({ queryKey: ["premiumUsers"] });
    },
    onError: (err: Error) => {
      toast.error(`Failed: ${err.message}`);
    },
  });

  const handleGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!principalInput.trim()) return;
    grantMutation.mutate(principalInput.trim());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="font-sans text-sm">
            Please log in to access the admin panel.
          </span>
        </div>
      </div>
    );
  }

  if (!isFrontendAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Card
          className="max-w-md w-full mx-4 border"
          style={{
            backgroundColor: "oklch(0.16 0.025 243)",
            borderColor: "oklch(0.24 0.028 243)",
          }}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <ShieldX
                className="w-12 h-12"
                style={{ color: "oklch(0.6 0.2 25)" }}
              />
            </div>
            <CardTitle className="font-serif text-xl text-foreground">
              Access Denied
            </CardTitle>
            <CardDescription className="font-sans text-muted-foreground">
              You do not have admin privileges to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-7 h-7 text-gold" />
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Admin Panel
          </h1>
        </div>
        <p className="font-sans text-muted-foreground text-sm">
          Manage premium memberships and user access for Advay Tyagi Academy.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Grant Premium */}
        <Card
          className="border"
          style={{
            backgroundColor: "oklch(0.16 0.025 243)",
            borderColor: "oklch(0.24 0.028 243)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />
              <CardTitle className="font-serif text-lg text-foreground">
                Grant Premium Access
              </CardTitle>
            </div>
            <CardDescription className="font-sans text-muted-foreground text-sm">
              Enter a user's Principal ID to grant them premium membership
              (₹500/year access).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGrant} className="flex gap-3">
              <Input
                placeholder="e.g. abc12-def34-..."
                value={principalInput}
                onChange={(e) => setPrincipalInput(e.target.value)}
                className="flex-1 font-mono text-sm bg-card border-border text-foreground placeholder:text-muted-foreground/60"
              />
              <Button
                type="submit"
                disabled={grantMutation.isPending || !principalInput.trim()}
                className="bg-gold hover:bg-gold-light text-primary-foreground font-sans font-semibold px-5 shrink-0"
              >
                {grantMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Grant Premium"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Current Premium Users */}
        <Card
          className="border"
          style={{
            backgroundColor: "oklch(0.16 0.025 243)",
            borderColor: "oklch(0.24 0.028 243)",
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              <CardTitle className="font-serif text-lg text-foreground">
                Current Premium Users
              </CardTitle>
              {premiumUsers.length > 0 && (
                <Badge
                  className="ml-auto font-sans text-xs"
                  style={{
                    backgroundColor: "oklch(0.22 0.03 243)",
                    color: "oklch(0.82 0.18 68)",
                    border: "1px solid oklch(0.3 0.04 243)",
                  }}
                >
                  {premiumUsers.length} members
                </Badge>
              )}
            </div>
            <CardDescription className="font-sans text-muted-foreground text-sm">
              All users currently with premium membership access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-sans text-sm">Loading users...</span>
              </div>
            ) : premiumUsers.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-sans text-sm">No premium users yet.</p>
                <p className="font-sans text-xs mt-1 opacity-60">
                  Grant access using the form above.
                </p>
              </div>
            ) : (
              <div
                className="divide-y"
                style={{ borderColor: "oklch(0.22 0.025 243)" }}
              >
                {premiumUsers.map((principal) => (
                  <div
                    key={principal.toString()}
                    className="flex items-center justify-between py-3 gap-3"
                  >
                    <span
                      className="font-mono text-xs text-foreground/80 truncate flex-1"
                      title={principal.toString()}
                    >
                      {principal.toString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revokeMutation.mutate(principal)}
                      disabled={revokeMutation.isPending}
                      className="shrink-0 border-red-800/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 font-sans text-xs"
                    >
                      {revokeMutation.isPending ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "Revoke"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
