"use client";

import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  DEFAULT_RESUME_VARIANT,
  RESUME_VARIANTS,
  isResumeVariant,
  type ResumeVariant,
} from "@/lib/resume";

export default function ResumeViewer() {
  const searchParams = useSearchParams();
  const requestedVariant = searchParams.get("variant");
  const [variant, setVariant] = useState<ResumeVariant>(
    isResumeVariant(requestedVariant) ? requestedVariant : DEFAULT_RESUME_VARIANT
  );

  const active = RESUME_VARIANTS[variant];
  const variantKeys = Object.keys(RESUME_VARIANTS) as ResumeVariant[];

  // Vercel Blob serves these as `Content-Disposition: inline`, and browsers
  // only honor an <a download> for cross-origin URLs when the server sends
  // `attachment` — so a plain anchor just navigates to the PDF instead of
  // downloading it. Fetching the bytes and downloading via a same-origin
  // blob: URL forces the download reliably instead.
  async function handleDownload() {
    try {
      const response = await fetch(active.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Niramay_Kelkar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(active.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Resume version"
        className="inline-flex gap-1 rounded-full border border-border p-1"
      >
        {variantKeys.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={variant === key}
            onClick={() => setVariant(key)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              variant === key
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {RESUME_VARIANTS[key].label}
          </button>
        ))}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border sm:block">
        <iframe
          key={variant}
          src={active.url}
          title={`${active.label} resume preview`}
          className="h-[90vh] w-full"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground sm:hidden">
        For the best experience, view on desktop — or download below.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className="mt-6 inline-block rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
      >
        Download resume
      </button>
    </div>
  );
}
