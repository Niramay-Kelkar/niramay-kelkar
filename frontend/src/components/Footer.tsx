const LINKS = [
  { href: "https://github.com/Niramay-Kelkar", label: "GitHub" },
  { href: "https://linkedin.com/in/niramay-kelkar", label: "LinkedIn" },
  { href: "mailto:niramayrkelkar@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Niramay Kelkar</p>
        <nav className="flex gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
