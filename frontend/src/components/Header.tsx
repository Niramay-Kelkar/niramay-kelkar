import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HoverLift from "@/components/HoverLift";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/trophy", label: "Trophy Wall" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/media", label: "Media" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight">
          Niramay Kelkar
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <HoverLift key={link.href} className="inline-block">
                <Link
                  href={link.href}
                  className="relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
                >
                  {link.label}
                </Link>
              </HoverLift>
            ))}
          </nav>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
              ⌘K
            </kbd>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
