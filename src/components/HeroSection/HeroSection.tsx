import { SiteHeader } from "../SiteHeader/SiteHeader";
import { ServicePicker } from "../ServicePicker/ServicePicker";
interface HeroSectionProps {
  service: string;
  onServiceChange: (service: string) => void;
}
export function HeroSection({ service, onServiceChange }: HeroSectionProps) {
  return (
    <div className="hero-shell" id="inicio">
      <SiteHeader />
      <section
        className="hero wrap"
        aria-labelledby="hero-title"
        data-motion="hero"
      >
        <div className="hero-copy">
          <h1 id="hero-title">
            No hace falta tenerlo todo claro para empezar.
          </h1>
          <p>
            Contanos qué querés lograr. Buscamos una solución a tu medida, sin
            importar el tamaño de tu proyecto.
          </p>
          <ServicePicker service={service} onServiceChange={onServiceChange} />
        </div>
      </section>
    </div>
  );
}
