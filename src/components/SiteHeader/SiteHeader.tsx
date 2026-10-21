import { ActionLink } from "../ActionLink/ActionLink";
import { Brand } from "../Brand/Brand";
import { Navigation } from "../Navigation/Navigation";

export function SiteHeader() {
  return (
    <header className="site-header wrap" role="banner">
      <Brand />
      <Navigation label="Navegación principal" />
      <ActionLink variant="outline" href="#contacto">
        Conversemos
      </ActionLink>
    </header>
  );
}
