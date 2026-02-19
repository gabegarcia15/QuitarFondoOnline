"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

/**
 * DNS record type from the Convex schema
 */
export type DnsRecord = {
  type: string;
  name: string;
  value: string;
  ttl?: number;
  priority?: number;
};

type RecordsTableProps = {
  records: DnsRecord[];
  showStatus?: boolean;
  statusMap?: Record<string, "added" | "removed" | "unchanged">;
};

/**
 * Valid badge color type
 */
type BadgeColor =
  | "blue"
  | "indigo"
  | "violet"
  | "amber"
  | "emerald"
  | "sky"
  | "rose"
  | "orange"
  | "pink"
  | "teal"
  | "zinc";

/**
 * Color mapping for DNS record types
 */
const typeColors: Record<string, BadgeColor> = {
  A: "blue",
  AAAA: "indigo",
  CNAME: "violet",
  MX: "amber",
  TXT: "emerald",
  NS: "sky",
};

/**
 * Status colors for diff view
 */
const statusColors = {
  added: "green" as const,
  removed: "red" as const,
  unchanged: "zinc" as const,
};

function getTypeColor(type: string): BadgeColor {
  return typeColors[type.toUpperCase()] || "zinc";
}

function CopyButton({ text }: { text: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 text-[var(--text-muted)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-colors"
      title="Copy to clipboard"
    >
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
          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
        />
      </svg>
    </button>
  );
}

export function RecordsTable({ records, showStatus, statusMap }: RecordsTableProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-[var(--border)] py-12">
        <svg
          className="h-12 w-12 text-[var(--text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <Text className="mt-4 text-[var(--text-secondary)]">No DNS records found</Text>
      </div>
    );
  }

  // Group records by type for better organization
  const groupedRecords = records.reduce(
    (acc, record) => {
      const type = record.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(record);
      return acc;
    },
    {} as Record<string, DnsRecord[]>
  );

  // Get unique key for status lookup
  const getRecordKey = (record: DnsRecord) =>
    `${record.type}|${record.name}|${record.value}`;

  return (
    <Table dense>
      <TableHead>
        <TableRow>
          <TableHeader className="w-24">Type</TableHeader>
          <TableHeader className="w-32">Name</TableHeader>
          <TableHeader>Value</TableHeader>
          {showStatus && <TableHeader className="w-28">Status</TableHeader>}
          <TableHeader className="w-20">TTL</TableHeader>
          <TableHeader className="w-20">Priority</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(groupedRecords).map(([type, typeRecords]) =>
          typeRecords.map((record, index) => {
            const status = statusMap?.[getRecordKey(record)];
            return (
              <TableRow
                key={`${type}-${record.name}-${record.value}-${index}`}
                className={
                  status === "added"
                    ? "bg-green-50 dark:bg-green-900/10"
                    : status === "removed"
                      ? "bg-red-50 dark:bg-red-900/10"
                      : undefined
                }
              >
                <TableCell>
                  <Badge color={getTypeColor(record.type)}>
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {record.name}
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="flex items-center">
                    <span
                      className="truncate font-mono text-xs"
                      title={record.value}
                    >
                      {record.value}
                    </span>
                    <CopyButton text={record.value} />
                  </div>
                </TableCell>
                {showStatus && (
                  <TableCell>
                    {status && (
                      <Badge color={statusColors[status]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                )}
                <TableCell className="text-[var(--text-muted)]">
                  {record.ttl !== undefined ? record.ttl : "—"}
                </TableCell>
                <TableCell className="text-[var(--text-muted)]">
                  {record.priority !== undefined ? record.priority : "—"}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export function RecordsTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-10 bg-[var(--border)]" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="mb-2 h-12 bg-[var(--bg-primary)]"
        />
      ))}
    </div>
  );
}
