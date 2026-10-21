import { Button } from "../Button/Button";
import { site } from "../../config/site";
interface InquirySummaryProps {
  summary: string;
  onSave: () => void;
}
export function InquirySummary({ summary, onSave }: InquirySummaryProps) {
  return (
    <div className="summary">
      <label htmlFor="summary">Tu consulta</label>
      <textarea id="summary" readOnly value={summary} rows={7} />
      <Button type="button" onClick={onSave}>
        Guardar consulta
      </Button>
      {site.contactEmail && (
        <a
          className="email-link"
          href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Conversemos sobre mi proyecto")}&body=${encodeURIComponent(summary)}`}
        >
          Abrir en mi correo →
        </a>
      )}
    </div>
  );
}
