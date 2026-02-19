"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Subheading } from "@/components/ui/heading";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownDivider,
} from "@/components/ui/dropdown";
import type { Id } from "../../convex/_generated/dataModel";

export type DomainCardProps = {
  _id: Id<"domains">;
  domain: string;
  lastSnapshotAt?: number;
  snapshotFrequency: "hourly" | "daily" | "weekly";
  isActive: boolean;
  _creationTime: number;
  onSnapshot?: (domainId: Id<"domains">) => void;
  onDelete?: (domainId: Id<"domains">) => void;
  isSnapshotting?: boolean;
};

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

function getNextSnapshotTime(frequency: "hourly" | "daily" | "weekly"): Date {
  const now = new Date();

  switch (frequency) {
    case "hourly": {
      const nextHour = new Date(now);
      nextHour.setMinutes(0, 0, 0);
      nextHour.setHours(nextHour.getHours() + 1);
      return nextHour;
    }
    case "daily": {
      const nextDaily = new Date(now);
      nextDaily.setUTCHours(3, 0, 0, 0);
      if (nextDaily <= now) {
        nextDaily.setUTCDate(nextDaily.getUTCDate() + 1);
      }
      return nextDaily;
    }
    case "weekly": {
      // First, find the current day in UTC
      const currentUTCDay = now.getUTCDay();
      
      // If it's Sunday and we haven't passed 3 AM UTC yet, use today
      if (currentUTCDay === 0) {
        const todayAt3AM = new Date(now);
        todayAt3AM.setUTCHours(3, 0, 0, 0);
        if (now < todayAt3AM) {
          return todayAt3AM;
        }
      }
      
      // Calculate days until next Sunday (0 = Sunday)
      const daysUntilSunday = currentUTCDay === 0 ? 7 : 7 - currentUTCDay;
      
      // Start fresh with today's date, add days to get to Sunday
      const nextWeekly = new Date(now);
      nextWeekly.setUTCDate(now.getUTCDate() + daysUntilSunday);
      nextWeekly.setUTCHours(3, 0, 0, 0);
      
      return nextWeekly;
    }
  }
}

function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return `${formatted} UTC`;
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "h-8 w-8 text-[var(--accent)]"}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function DomainFavicon({ domain }: { domain: string }) {
  const [hasError, setHasError] = useState(false);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  if (hasError) {
    return <GlobeIcon className="h-8 w-8 text-[var(--accent)]" />;
  }

  return (
    <img
      src={faviconUrl}
      alt={`${domain} favicon`}
      width={32}
      height={32}
      className="h-8 w-8 rounded"
      onError={() => setHasError(true)}
    />
  );
}

function MoreIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      data-slot="icon"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      data-slot="icon"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      data-slot="icon"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const frequencyLabels = {
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
};

const frequencyColors = {
  hourly: "indigo" as const,
  daily: "sky" as const,
  weekly: "zinc" as const,
};

export function DomainCard({
  _id,
  domain,
  lastSnapshotAt,
  snapshotFrequency,
  isActive,
  onSnapshot,
  onDelete,
  isSnapshotting,
}: DomainCardProps) {
  return (
    <div className="group relative border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:border-[var(--text-muted)]/50 hover:shadow-lg hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center">
            <DomainFavicon domain={domain} />
          </div>
          <div>
            <Subheading level={3} className="text-lg font-bold tracking-tight">
              <a
                href={`/domains/${_id}`}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {domain}
              </a>
            </Subheading>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge color={frequencyColors[snapshotFrequency]}>
                {frequencyLabels[snapshotFrequency]}
              </Badge>
              {!isActive && (
                <Badge color="zinc">Paused</Badge>
              )}
            </div>
          </div>
        </div>
        <Dropdown>
          <DropdownButton plain aria-label="More options" className="opacity-50 group-hover:opacity-100 transition-opacity">
            <MoreIcon />
          </DropdownButton>
          <DropdownMenu anchor="bottom end">
            <DropdownItem
              onClick={() => onSnapshot?.(_id)}
              disabled={isSnapshotting}
            >
              {isSnapshotting ? <LoadingSpinner /> : <CameraIcon />}
              <DropdownLabel>
                {isSnapshotting ? "Taking snapshot..." : "Snapshot Now"}
              </DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => onDelete?.(_id)}>
              <TrashIcon />
              <DropdownLabel>Delete</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Footer with stats */}
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div className="flex flex-col gap-1">
          <Text className="text-xs" muted>
            {lastSnapshotAt
              ? `Last: ${formatRelativeTime(lastSnapshotAt)}`
              : "No snapshots yet"}
          </Text>
          {isActive && (
            <Text className="text-xs whitespace-nowrap" muted>
              Next: {formatDateTime(getNextSnapshotTime(snapshotFrequency).getTime())}
            </Text>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            href={`/domains/${_id}`}
            plain
            className="text-xs group/btn"
          >
            View History <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DomainCardSkeleton() {
  return (
    <div className="animate-pulse border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-lg bg-[var(--border)]" />
        <div className="flex-1">
          <div className="h-6 w-36 bg-[var(--border)] rounded" />
          <div className="mt-2 h-5 w-20 bg-[var(--border)] rounded" />
        </div>
      </div>
      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <div className="h-3 w-40 bg-[var(--border)] rounded" />
      </div>
    </div>
  );
}
