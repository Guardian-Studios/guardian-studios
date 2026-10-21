import { Button } from "../Button/Button";
import { InquirySummary } from "../InquirySummary/InquirySummary";
import { useState } from "react";
import { site } from "../../config/site";

interface ContactFormProps {
  service: string;
}

export function ContactForm({ service }: ContactFormProps) {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  function saveInquiry() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "consulta-guardian-studios.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Consulta guardada. Aún no se ha enviado al estudio.");
  }

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSummary(
          `Consulta para ${site.name}\nNombre: ${data.get("name")}\nCorreo: ${data.get("email")}\nNecesidad: ${service}\n\n${data.get("message")}`,
        );
        setStatus(
          "Tu consulta está lista. Todavía no se ha enviado; podés guardarla para compartirla.",
        );
      }}
    >
      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        required
        maxLength={100}
        placeholder="Tu nombre"
      />
      <label htmlFor="email">Correo</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="tu@correo.com"
      />
      <label htmlFor="message">Contanos tu idea</label>
      <textarea
        id="message"
        name="message"
        required
        maxLength={5000}
        rows={4}
        placeholder="¿Qué te gustaría construir?"
      />
      <Button type="submit">
        Preparar consulta <span aria-hidden="true">→</span>
      </Button>
      <p className="form-note">
        Prepará tu consulta para compartirla con el estudio.
      </p>
      <p role="status">{status}</p>
      {summary && <InquirySummary summary={summary} onSave={saveInquiry} />}
    </form>
  );
}
