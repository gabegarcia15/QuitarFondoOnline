"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Label, ErrorMessage } from "@/components/ui/fieldset";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type AddDomainFormProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AddDomainForm({ open, onClose, onSuccess }: AddDomainFormProps) {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addDomain = useMutation(api.domains.addDomain);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await addDomain({ domain: domain.trim() });
      setDomain("");
      onSuccess?.();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        // Extract clean message from Convex errors
        // Format: "[CONVEX M(...)] [Request ID: ...] Server Error Uncaught Error: <message>. at handler ..."
        const match = err.message.match(/Uncaught Error:\s*(.+?)(?:\.\s*at handler|\s*at handler|$)/i);
        const message = match ? match[1].trim() : err.message;
        setError(message.endsWith(".") ? message : `${message}.`);
      } else {
        setError("Failed to add domain. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDomain("");
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Domain</DialogTitle>
      <DialogDescription>
        Enter a domain name to start monitoring its DNS records. We&apos;ll take
        automatic snapshots based on your account tier.
      </DialogDescription>
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <Field>
            <Label>Domain Name</Label>
            <Input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setError(null);
              }}
              autoFocus
            />
            {error && (
              error.toLowerCase().includes("upgrade") ? (
                <div className="mt-3 px-4 py-3 border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                  <p className="text-sm text-[var(--text-primary)]">
                    <span className="font-serif italic">Limit reached.</span>{" "}
                    <Link
                      href="/settings"
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      Upgrade your plan →
                    </Link>
                  </p>
                </div>
              ) : (
                <ErrorMessage>{error}</ErrorMessage>
              )
            )}
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="red"
            disabled={!domain.trim() || isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Domain"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export function AddDomainButton({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        color="red"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <PlusIcon />
        Add Domain
      </Button>
      <AddDomainForm
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}

function PlusIcon() {
  return (
    <svg
      data-slot="icon"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
