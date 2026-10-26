import { ActionLink } from "../ActionLink/ActionLink";
import { Arrow } from "../Arrow/Arrow";
import { site } from "../../config/site";
interface ServicePickerProps {
  service: string;
  onServiceChange: (service: string) => void;
}
export function ServicePicker({
  service,
  onServiceChange,
}: ServicePickerProps) {
  const index = site.services.findIndex((item) => item === service);
  const prompt = site.servicePrompts[index < 0 ? 2 : index];
  return (
    <div className="service-picker" id="servicios">
      <fieldset>
        <legend>Elegí tu punto de partida</legend>
        <div className="service-options">
          {site.services.map((item) => (
            <label
              key={item}
              className={service === item ? "service selected" : "service"}
            >
              <input
                type="radio"
                name="service"
                value={item}
                checked={service === item}
                onChange={() => onServiceChange(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="service-route">
        <div className="service-context" aria-live="polite" aria-atomic="true">
          <p className="service-question">{prompt.question}</p>
          <p>{prompt.description}</p>
        </div>
        <ActionLink href="#contacto">
          Conversemos <Arrow />
        </ActionLink>
      </div>
      <a className="explore-process" href="#proceso">
        Explorá cómo lo construimos <Arrow />
      </a>
    </div>
  );
}
