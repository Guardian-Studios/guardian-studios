import { Brand } from "../Brand/Brand";
import { Navigation } from "../Navigation/Navigation";
import { site } from "../../config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <Brand />
      <Navigation label="Navegación de pie de página" />
      <p>
        {site.name} · {site.location}
        <br />
        Diseño y desarrollo de soluciones.
      </p>
    </footer>
  );
}
