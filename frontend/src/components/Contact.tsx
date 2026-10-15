import ContactForm from "@/components/ContactForm";
import LinkedInBadge from "@/components/LinkedInBadge";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <Container as="section" id="contact" className="border-t border-border">
      <Reveal>
        <h2 className="font-display text-2xl tracking-tight">Get in touch</h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          Have a role, project, or question in mind? Send a message and
          I&apos;ll reply by email, or connect with me on LinkedIn.
        </p>
        <div className="mt-6">
          <LinkedInBadge />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}
