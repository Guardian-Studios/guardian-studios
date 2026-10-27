import { ActionLink } from "../ActionLink/ActionLink";
import { Brand } from "../Brand/Brand";
import { Navigation } from "../Navigation/Navigation";
import { MotionToggle } from "../MotionToggle/MotionToggle";

export function SiteHeader() {
  return (
    <>
      <div className="motion-preferences wrap">
        <MotionToggle />
      </div>
      <header className="site-header wrap" role="banner" data-motion="header">
        <Brand />
        <Navigation label="Navegación principal" />
        <ActionLink variant="outline" href="#contacto">
          Conversemos
        </ActionLink>
      </header>
    </>
  );
}
