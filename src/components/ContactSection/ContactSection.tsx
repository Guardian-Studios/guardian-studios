import { ContactForm } from "../ContactForm/ContactForm";
interface ContactSectionProps {
  service: string;
}
export function ContactSection({ service }: ContactSectionProps) {
  return (
    <section
      className="contact section"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="wrap contact-inner">
        <div>
          <h2 id="contact-title">Hablemos de tu proyecto</h2>
          <p>
            Contanos un poco sobre tu idea. Podemos empezar por lo que tenés en
            mente.
          </p>
          <p className="selected-need">
            Tu punto de partida: <strong>{service}</strong>
          </p>
        </div>
        <ContactForm service={service} />
      </div>
    </section>
  );
}
