"use client";

import { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Text } from "@/components/ui/text";
import { type Tier, tierDomainLimits } from "@/lib/tier-config";

interface BillingSectionProps {
  tier: Tier;
  subscriptionStatus?: string;
  currentPeriodEnd?: number;
  hasStripeCustomer: boolean;
}

const tierLabels: Record<Tier, string> = {
  free: "Free",
  pro: "Pro",
  team: "Team",
};

export function BillingSection({
  tier,
  subscriptionStatus,
  currentPeriodEnd,
  hasStripeCustomer,
}: BillingSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createBillingPortalSession = useAction(api.stripe.createBillingPortalSession);
  const domains = useQuery(api.domains.getMyDomains);

  const domainCount = domains?.length ?? 0;
  const domainLimit = tierDomainLimits[tier];
  const isPaidPlan = tier !== "free";

  const handleManageBilling = async () => {
    if (!hasStripeCustomer) return;

    setIsLoading(true);
    try {
      const { url } = await createBillingPortalSession();
      window.location.href = url;
    } catch (error) {
      console.error("Failed to create billing portal session:", error);
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="border-b border-[var(--border)] px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
          Billing
        </h2>
        <Text className="mt-1 text-sm">
          Manage your subscription and billing details.
        </Text>
      </div>

      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Current Plan */}
          <div className="border border-[var(--border)] p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Current Plan
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-2xl text-[var(--text-primary)]">
                {tierLabels[tier]}
              </span>
              {isPaidPlan && subscriptionStatus === "active" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-500/10 text-emerald-600">
                  Active
                </span>
              )}
              {subscriptionStatus === "canceled" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-600">
                  Canceling
                </span>
              )}
              {subscriptionStatus === "past_due" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-red-500/10 text-red-600">
                  Past Due
                </span>
              )}
            </div>
          </div>

          {/* Domain Usage */}
          <div className="border border-[var(--border)] p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Domains Used
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif italic text-2xl text-[var(--text-primary)]">
                {domainCount}
              </span>
              <span className="text-[var(--text-muted)] text-sm">
                / {domainLimit === "Unlimited" ? "∞" : domainLimit}
              </span>
            </div>
            {domainLimit !== "Unlimited" && (
              <div className="mt-2 h-1.5 bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all"
                  style={{
                    width: `${Math.min((domainCount / domainLimit) * 100, 100)}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Next Billing Date */}
          {isPaidPlan && currentPeriodEnd && (
            <div className="border border-[var(--border)] p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                {subscriptionStatus === "canceled" ? "Access Until" : "Next Billing"}
              </div>
              <div className="font-serif italic text-lg text-[var(--text-primary)]">
                {formatDate(currentPeriodEnd)}
              </div>
            </div>
          )}

          {/* Manage Billing Button */}
          {hasStripeCustomer && (
            <div className="border border-[var(--border)] p-4 flex items-center justify-center">
              <button
                onClick={handleManageBilling}
                disabled={isLoading}
                className="group flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Manage Billing
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Info text for free users */}
        {!hasStripeCustomer && tier === "free" && (
          <div className="mt-6 text-center">
            <Text className="text-sm" muted>
              Upgrade to a paid plan to access billing management.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
