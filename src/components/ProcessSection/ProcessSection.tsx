import { useRef, useState } from "react";
import { site } from "../../config/site";
import { gsap } from "gsap";
import { useMotionEffect } from "../../motion/useMotionEffect";
import { motion } from "../../motion/tokens";

export function ProcessSection() {
  const [selected, setSelected] = useState(0);
  const step = site.steps[selected];
  const motionRef = useRef<HTMLElement>(null);
  const previous = useRef(selected);
  useMotionEffect(motionRef, (element) => {
    const previousStep = previous.current;
    const direction = selected >= previousStep ? 1 : -1;
    previous.current = selected;
    gsap.fromTo(element.querySelector(".process-content"), {
      x: direction * 48, opacity: 0.4,
    }, {
      x: 0, opacity: 1, duration: motion.state,
      ease: motion.ease, clearProps: "transform,opacity",
    });
    element.querySelectorAll(".process-connector-fill").forEach((connector, index) => {
      gsap.fromTo(connector, { scaleY: index < previousStep ? 1 : 0 }, {
        scaleY: index < selected ? 1 : 0,
        duration: motion.continuity, ease: motion.ease,
      });
    });
  }, [selected]);

  return (
    <section
      className="process wrap section"
      id="proceso"
      aria-labelledby="process-title"
      data-motion="process"
      ref={motionRef}
    >
      <div className="process-intro">
        <h2 id="process-title">
          Primero escuchamos.
          <br />
          Después construimos.
        </h2>
        <p>
          Un proceso claro, colaborativo y flexible que se adapta a tus
          necesidades. Te acompañamos desde la idea hasta el lanzamiento.
        </p>
      </div>
      <div className="process-explorer">
        <ol className="process-rail" aria-label="Etapas del proceso">
          {site.steps.map((item, index) => (
            <li key={item.title}>
              {index < site.steps.length - 1 && (
                <span className="process-connector" aria-hidden="true">
                  <span
                    className="process-connector-fill"
                    style={{ transform: `scaleY(${index < selected ? 1 : 0})` }}
                  />
                </span>
              )}
              <button
                type="button"
                aria-pressed={selected === index}
                aria-controls="process-feature"
                onClick={() => setSelected(index)}
              >
                <span className="process-rail-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="process-feature" id="process-feature">
          <div className="process-content" aria-live="polite" aria-atomic="true">
            <p className="process-position">
              Etapa {selected + 1} de {site.steps.length}
            </p>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
          <div className="process-navigation" aria-label="Recorrer el proceso">
            <button
              type="button"
              disabled={selected === 0}
              onClick={() => setSelected(selected - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg>
              Anterior
            </button>
            <button
              type="button"
              disabled={selected === site.steps.length - 1}
              onClick={() => setSelected(selected + 1)}
            >
              Siguiente
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
