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
        <div className="contact-copy">
          <h2 id="contact-title">
            Empecemos
            <br />
            por tu idea.
          </h2>
          <p>
            Contanos qué querés lograr. Buscamos una solución a tu medida, sin
            importar el tamaño de tu proyecto.
          </p>
          <div className="selected-need">
            <span>Tu punto de partida</span>
            <strong>{service}</strong>
            <a href="#servicios">Cambiar servicio</a>
          </div>
          <p className="contact-note">
            Prepará y descargá tu consulta para compartirla. Este formulario no
            envía mensajes al estudio.
          </p>
        </div>
        <ContactForm service={service} />
      </div>
    </section>
  );
}
