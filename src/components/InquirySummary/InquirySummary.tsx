import { Button } from "../Button/Button";
import { site } from "../../config/site";
import { useMotionTransition } from "../../motion/useMotionTransition";
interface InquirySummaryProps {
  summary: string;
  onSave: () => void;
}
export function InquirySummary({ summary, onSave }: InquirySummaryProps) {
  const motionRef = useMotionTransition<HTMLDivElement>("", [summary]);
  return (
    <div className="summary" ref={motionRef}>
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
