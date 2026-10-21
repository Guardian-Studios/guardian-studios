import { ActionLink } from "../ActionLink/ActionLink";
interface MvpSectionProps {
  onServiceChange: (service: string) => void;
}
export function MvpSection({ onServiceChange }: MvpSectionProps) {
  return (
    <section
      className="mvp section"
      aria-labelledby="mvp-title"
      data-motion="launch"
    >
      <div className="wrap mvp-inner">
        <svg
          viewBox="0 0 120 120"
          className="upload-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden="true"
        >
          <path d="M32 85H25a20 20 0 0 1-2-40 35 35 0 0 1 68-5 23 23 0 0 1 0 45H83M60 106V57m-18 19 18-19 18 19" />
        </svg>
        <div>
          <h2 id="mvp-title">
            ¿Creaste tu MVP con IA
            <br />y ahora necesitás publicarlo?
          </h2>
          <p>
            Revisamos lo que ya construiste, resolvemos lo que falta y te
            acompañamos para ponerlo en línea. Nos adaptamos a las herramientas
            de tu proyecto.
          </p>
          <p>
            <strong>¡Hablá con nosotros, podemos ayudarte!</strong>
          </p>
          <ActionLink
            href="#contacto"
            onClick={() => onServiceChange("Publicar mi MVP")}
          >
            Quiero lanzar mi MVP <span aria-hidden="true">→</span>
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
