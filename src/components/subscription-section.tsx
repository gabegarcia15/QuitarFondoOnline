"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Text } from "@/components/ui/text";

type Tier = "free" | "pro" | "team";
type BillingPeriod = "monthly" | "annual";

interface PricingTier {
  id: Tier;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: (string | { text: string; included: boolean })[];
  limits: {
    domains: string;
    frequency: string;
    retention: string;
  };
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "1 domain",
      "Weekly snapshots",
      "30-day retention",
      "JSON export",
      { text: "Priority support", included: false },
    ],
    limits: {
      domains: "1",
      frequency: "Weekly",
      retention: "30 days",
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 9,
    annualPrice: 86,
    features: [
      "10 domains",
      "Daily snapshots",
      "1-year retention",
      "JSON, CSV & XLSX export",
      "Priority support",
    ],
    limits: {
      domains: "10",
      frequency: "Daily",
      retention: "1 year",
    },
    popular: true,
  },
  {
    id: "team",
    name: "Business",
    monthlyPrice: 29,
    annualPrice: 278,
    features: [
      "Unlimited domains",
      "Hourly snapshots",
      "Unlimited retention",
      "JSON, CSV & XLSX export",
      "Priority support",
    ],
    limits: {
      domains: "Unlimited",
      frequency: "Hourly",
      retention: "Unlimited",
    },
  },
];

const priceIds: Record<Tier, { monthly: string; annual: string }> = {
  free: { monthly: "", annual: "" },
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
    annual: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID ?? "",
  },
  team: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID ?? "",
    annual: process.env.NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID ?? "",
  },
};

interface SubscriptionSectionProps {
  currentTier: Tier;
}

export function SubscriptionSection({ currentTier }: SubscriptionSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null);
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);

  const handleUpgrade = async (tier: Tier) => {
    if (tier === "free" || tier === currentTier) return;

    const priceId = priceIds[tier][billingPeriod];
    if (!priceId) {
      console.error("Price ID not configured for", tier, billingPeriod);
      return;
    }

    setLoadingTier(tier);
    try {
      const { url } = await createCheckoutSession({ priceId });
      window.location.href = url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setLoadingTier(null);
    }
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="border-b border-[var(--border)] px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
          Subscription
        </h2>
        <Text className="mt-1 text-sm">
          Choose the plan that fits your needs.
        </Text>
      </div>

      <div className="p-6">
        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center border border-[var(--border)] p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === "annual"
                  ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Annual
              <span className={`text-xs px-1.5 py-0.5 ${
                billingPeriod === "annual"
                  ? "bg-green-600 text-white"
                  : "bg-green-500/20 text-green-400"
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => {
            const isCurrentPlan = tier.id === currentTier;
            const price = billingPeriod === "monthly" ? tier.monthlyPrice : tier.annualPrice;
            const isLoading = loadingTier === tier.id;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  isCurrentPlan
                    ? "border-[var(--accent)] shadow-md"
                    : tier.popular
                    ? "border-[var(--text-primary)]"
                    : "border-[var(--border)]"
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && !isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--accent)] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Tier Name */}
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif italic text-5xl text-[var(--text-primary)]">
                        ${price}
                      </span>
                      <span className="text-[var(--text-muted)] text-sm">
                        /{billingPeriod === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingPeriod === "annual" && (
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {tier.monthlyPrice > 0 
                          ? `$${Math.round(price / 12)}/mo billed annually`
                          : "Free forever"}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((feature, idx) => {
                      const isObject = typeof feature === "object";
                      const text = isObject ? feature.text : feature;
                      const included = isObject ? feature.included : true;
                      
                      return (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          {included ? (
                            <svg
                              className="h-4 w-4 text-[var(--accent)] mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                          <span className={included ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"}>{text}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(tier.id)}
                    disabled={isCurrentPlan || tier.id === "free" || isLoading}
                    className={`mt-6 w-full py-3 text-sm font-semibold transition-all duration-200 ${
                      isCurrentPlan
                        ? "border border-[var(--border)] text-[var(--text-muted)] cursor-default"
                        : tier.id === "free"
                        ? "border border-[var(--border)] text-[var(--text-muted)] cursor-default"
                        : "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] disabled:opacity-50"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
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
                        Processing...
                      </span>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : tier.id === "free" ? (
                      "Free Forever"
                    ) : (
                      "Upgrade"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
