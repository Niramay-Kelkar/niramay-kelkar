import Link from "next/link";

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
    <header className="sticky top-0 z-10 border-b border-black/10 bg-background/80 backdrop-blur-sm dark:border-white/10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Niramay Kelkar
        </Link>
        <nav className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
