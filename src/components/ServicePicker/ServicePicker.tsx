import { ActionLink } from "../ActionLink/ActionLink";
import { site } from "../../config/site";
interface ServicePickerProps {
  service: string;
  onServiceChange: (service: string) => void;
}
export function ServicePicker({
  service,
  onServiceChange,
}: ServicePickerProps) {
  return (
    <div className="service-picker">
      <fieldset>
        <legend>¿Qué necesitás?</legend>
        {site.services.map((item, index) => (
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
            <span className="service-index" aria-hidden="true">
              {["Web", "App", "+", "?"][index]}
            </span>
            {item}
          </label>
        ))}
      </fieldset>
      <ActionLink href="#contacto">
        Conversemos <span aria-hidden="true">→</span>
      </ActionLink>
    </div>
  );
}
