import ContactForm from "@/components/ContactForm";
import LinkedInBadge from "@/components/LinkedInBadge";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl border-t border-black/10 px-6 py-16 dark:border-white/10"
    >
      <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
      <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Have a role, project, or question in mind? Send a message and
        I&apos;ll reply by email, or connect with me on LinkedIn.
      </p>
      <div className="mt-6">
        <LinkedInBadge />
      </div>
      <ContactForm />
    </section>
  );
}
