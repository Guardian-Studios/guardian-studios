import { useId } from "react";
import { useMotion } from "../../motion/MotionContext";

export function MotionToggle() {
  const { enabled, reducedMotion, toggle } = useMotion();
  const descriptionId = useId();

  return (
    <div className="motion-toggle">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Animaciones"
        aria-describedby={reducedMotion ? descriptionId : undefined}
        disabled={reducedMotion}
        onClick={toggle}
      >
        <span className="motion-toggle-track" aria-hidden="true">
          <span />
        </span>
        <span>Animaciones</span>
        <span className="motion-toggle-state" aria-hidden="true">
        </span>
      </button>
      {reducedMotion && (
        <p id={descriptionId}>Movimiento reducido por tu sistema.</p>
      )}
    </div>
  );
}
