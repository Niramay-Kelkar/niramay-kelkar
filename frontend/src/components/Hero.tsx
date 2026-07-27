import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-3xl flex-col-reverse items-center gap-10 px-6 pt-20 pb-16 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
          San Jose, CA
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Niramay Kelkar
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Backend &amp; full-stack software engineer. I build reliable APIs,
          microservices, and data backends — and increasingly, the frontends
          and tooling around them.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
          <a
            href="#projects"
            className="rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-black/10 px-5 py-3 transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
          >
            Get in touch
          </a>
        </div>
      </div>
      <Image
        src="/headshot.png"
        alt="Niramay Kelkar"
        width={160}
        height={160}
        priority
        className="h-40 w-40 shrink-0 rounded-full object-cover"
      />
    </section>
  );
}
