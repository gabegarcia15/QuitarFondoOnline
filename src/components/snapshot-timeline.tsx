"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Id } from "../../convex/_generated/dataModel";

/**
 * Snapshot type from the Convex schema
 */
export type Snapshot = {
  _id: Id<"snapshots">;
  _creationTime: number;
  domainId: Id<"domains">;
  recordCount: number;
  trigger: "manual" | "scheduled" | "initial";
  createdAt: number;
};

type SnapshotTimelineProps = {
  snapshots: Snapshot[];
  currentSnapshotId?: Id<"snapshots">;
  onSelectSnapshot?: (snapshotId: Id<"snapshots">) => void;
  onCompare?: (snapshotId1: Id<"snapshots">, snapshotId2: Id<"snapshots">) => void;
  compareMode?: boolean;
  selectedForCompare?: Id<"snapshots">[];
  onToggleCompare?: (snapshotId: Id<"snapshots">) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
};

/**
 * Format relative time for snapshots
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (hours > 0) return `${hours} hr ago`;
  if (minutes > 0) return `${minutes} min ago`;
  return "Just now";
}

/**
 * Format short date for tooltip/secondary display
 */
function formatShortDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const triggerLabels = {
  manual: "Manual",
  scheduled: "Auto",
  initial: "Initial",
};

function CameraIcon() {
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

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export function SnapshotTimeline({
  snapshots,
  currentSnapshotId,
  onSelectSnapshot,
  compareMode,
  selectedForCompare,
  onToggleCompare,
  hasMore,
  onLoadMore,
  isLoading,
}: SnapshotTimelineProps) {
  if (snapshots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center border border-dashed border-[var(--border)] text-[var(--text-muted)]">
          <CameraIcon />
        </div>
        <p className="mt-4 font-medium text-[var(--text-primary)]">No snapshots yet</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Take your first snapshot to start tracking
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {snapshots.map((snapshot) => {
        const isSelected = currentSnapshotId === snapshot._id;
        const isSelectedForCompare = selectedForCompare?.includes(snapshot._id);

        return (
          <div
            key={snapshot._id}
            onClick={() => {
              if (compareMode) {
                onToggleCompare?.(snapshot._id);
              } else {
                onSelectSnapshot?.(snapshot._id);
              }
            }}
            className={`group relative cursor-pointer border-l-2 py-3 pl-4 pr-3 transition-all duration-150 ${
              isSelected
                ? "border-l-[var(--accent)] bg-[var(--accent)]/5"
                : isSelectedForCompare
                  ? "border-l-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-l-transparent hover:border-l-[var(--border)] hover:bg-[var(--bg-primary)]"
            }`}
          >
            {/* Compare checkbox */}
            {compareMode && (
              <div className="absolute left-[-11px] top-1/2 -translate-y-1/2">
                <div
                  className={`flex h-5 w-5 items-center justify-center border text-xs ${
                    isSelectedForCompare
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--border)] bg-[var(--bg-secondary)]"
                  }`}
                >
                  {isSelectedForCompare && "✓"}
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {/* Time + Badge + Date row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif italic text-[var(--text-primary)]">
                    {formatRelativeTime(snapshot.createdAt)}
                  </span>
                  <Badge
                    color={snapshot.trigger === "manual" ? "zinc" : "sky"}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {triggerLabels[snapshot.trigger]}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatShortDate(snapshot.createdAt)}
                  </span>
                </div>

                {/* Records count */}
                <div className="mt-1 text-xs text-[var(--text-muted)]">
                  <span className="font-mono">{snapshot.recordCount} records</span>
                </div>
              </div>

              {/* Action */}
              {!compareMode && (
                <Button
                  href={`/snapshots/${snapshot._id}`}
                  plain
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-xs gap-1"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <span>Details</span>
                  <ArrowIcon />
                </Button>
              )}
            </div>
          </div>
        );
      })}

      {/* Load more */}
      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="mt-4 w-full py-2 text-center text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export function SnapshotTimelineSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse border-l-2 border-l-transparent py-3 pl-4 pr-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-[var(--border)]" />
            <div className="h-4 w-12 bg-[var(--border)]" />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-3 w-20 bg-[var(--border)] opacity-50" />
            <div className="h-3 w-24 bg-[var(--border)] opacity-50" />
          </div>
        </div>
      ))}
    </div>
  );
}
