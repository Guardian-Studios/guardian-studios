import { SiteHeader } from "../SiteHeader/SiteHeader";
import { ServicePicker } from "../ServicePicker/ServicePicker";
import { site } from "../../config/site";
interface HeroSectionProps {
  service: string;
  onServiceChange: (service: string) => void;
}
export function HeroSection({ service, onServiceChange }: HeroSectionProps) {
  return (
    <div className="hero-shell" id="inicio">
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title" data-motion="hero">
        <div className="portal-landscape" aria-hidden="true">
          <img
            src="/images/portal4.png"
            width="1672"
            height="940"
            alt=""
            fetchPriority="high"
          />
        </div>
        <div className="hero-copy wrap">
          <h1 id="hero-title">
            No hace falta tenerlo todo claro para empezar.
          </h1>
          <p>
            Contanos qué querés lograr. Buscamos una solución a tu medida, sin
            importar el tamaño de tu proyecto.
          </p>
        </div>
        <div className="portal-caption wrap" aria-hidden="true">
          <span>
            {site.name} / {site.location}
          </span>
          <span>Tu próximo proyecto empieza acá.</span>
        </div>
        <div className="wrap hero-explorer">
          <ServicePicker service={service} onServiceChange={onServiceChange} />
        </div>
      </section>
    </div>
  );
}
