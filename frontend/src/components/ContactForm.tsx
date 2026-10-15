"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { API_BASE_URL, type ContactResponse } from "@/lib/api";

type Status = "idle" | "pending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: ContactResponse | { detail?: string } = await res.json();

      if (!res.ok || !("success" in data && data.success)) {
        const detail =
          "detail" in data && data.detail
            ? data.detail
            : "Something went wrong. Please try again.";
        setErrorMessage(detail);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Could not reach the server. Please try again later.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        Thanks for reaching out — I&apos;ll get back to you soon.
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
      {/* Honeypot field: hidden from real users via CSS, bots that
          auto-fill every field will trip it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className="mt-1 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      )}

      <motion.button
        type="submit"
        disabled={status === "pending"}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "pending" ? "Sending…" : "Send message"}
      </motion.button>
    </form>
  );
}
