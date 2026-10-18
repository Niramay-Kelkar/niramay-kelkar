"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const EMAIL = "niramayrkelkar@gmail.com";
const GITHUB_URL = "https://github.com/Niramay-Kelkar";
const LINKEDIN_URL = "https://linkedin.com/in/niramay-kelkar";
const RESUME_STARTUP_URL = "/Niramay_Kelkar_Resume_AI_v2.pdf";
const RESUME_FULLSTACK_URL = "/Niramay_Kelkar_Resume_FullStack_v5.pdf";

type CommandItemConfig = {
  label: string;
  onSelect: () => void;
};

function downloadFile(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function CommandPalette() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const navigateToSection = useCallback(
    (id: string) => {
      close();
      router.push(`/#${id}`);
    },
    [close, router]
  );

  const openContactForm = useCallback(() => {
    close();
    router.push("/#contact");
    window.setTimeout(() => {
      document.getElementById("name")?.focus();
    }, 300);
  }, [close, router]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard API unavailable — nothing more we can do here.
    }
  }, []);

  const groups: { heading: string; items: CommandItemConfig[] }[] = [
    {
      heading: "Navigate",
      items: [
        { label: "About", onSelect: () => navigateToSection("about") },
        { label: "Experience", onSelect: () => navigateToSection("experience") },
        { label: "Projects", onSelect: () => navigateToSection("projects") },
        { label: "GitHub Activity", onSelect: () => navigateToSection("github-stats") },
        { label: "Contact", onSelect: () => navigateToSection("contact") },
      ],
    },
    {
      heading: "Links",
      items: [
        {
          label: "View GitHub profile",
          onSelect: () => {
            close();
            window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
          },
        },
        {
          label: "View LinkedIn",
          onSelect: () => {
            close();
            window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
          },
        },
      ],
    },
    {
      heading: "Resume",
      items: [
        {
          label: "Download resume (startup-focused)",
          onSelect: () => {
            close();
            downloadFile(RESUME_STARTUP_URL);
          },
        },
        {
          label: "Download resume (full-stack)",
          onSelect: () => {
            close();
            downloadFile(RESUME_FULLSTACK_URL);
          },
        },
      ],
    },
    {
      heading: "Contact",
      items: [
        { label: copied ? "Copied!" : "Copy email address", onSelect: copyEmail },
        { label: "Open contact form", onSelect: openContactForm },
      ],
    },
  ];

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-24 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-full"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={transition}
              >
                <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                <Command
                  label="Command palette"
                  value={search}
                  onValueChange={setSearch}
                  loop
                  className="flex flex-col"
                >
                  <Command.Input
                    autoFocus
                    placeholder="Type a command or search…"
                    className="border-b border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <Command.List className="max-h-80 overflow-y-auto p-2">
                    <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </Command.Empty>
                    {groups.map((group) => (
                      <Command.Group
                        key={group.heading}
                        heading={group.heading}
                        className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
                      >
                        {group.items.map((item) => (
                          <Command.Item
                            key={item.label}
                            onSelect={item.onSelect}
                            className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent"
                          >
                            {item.label}
                          </Command.Item>
                        ))}
                      </Command.Group>
                    ))}
                  </Command.List>
                </Command>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
