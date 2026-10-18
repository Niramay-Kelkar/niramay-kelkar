export type ResumeVariant = "startup" | "fullstack";

export const RESUME_VARIANTS: Record<
  ResumeVariant,
  { label: string; url: string }
> = {
  startup: {
    label: "Startup / AI-focused",
    url: "https://ubsdhkhzi9rve8rt.public.blob.vercel-storage.com/Niramay_Kelkar_Resume_AI_v2.pdf",
  },
  fullstack: {
    label: "Full-stack / Enterprise",
    url: "https://ubsdhkhzi9rve8rt.public.blob.vercel-storage.com/Niramay_Kelkar_Resume_FullStack_v5.pdf",
  },
};

export const DEFAULT_RESUME_VARIANT: ResumeVariant = "startup";

export function isResumeVariant(value: string | null): value is ResumeVariant {
  return value === "startup" || value === "fullstack";
}
