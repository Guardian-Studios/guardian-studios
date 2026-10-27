import { useState } from "react";
import { site } from "../../config/site";
import { useMotionTransition } from "../../motion/useMotionTransition";

export function TeamSection() {
  const [selected, setSelected] = useState(0);
  const person = site.team[selected];
  const motionRef = useMotionTransition<HTMLElement>(
    ".team-portrait img:not([hidden]), .team-feature figcaption",
    [selected],
  );

  return (
    <section
      className="team wrap section"
      id="equipo"
      aria-labelledby="team-title"
      data-motion="team"
      ref={motionRef}
    >
      <div className="team-intro">
        <h2 id="team-title">Conocé al equipo</h2>
        <p>
          Un equipo multidisciplinario que combina diseño, desarrollo y
          estrategia. Nos encanta lo que hacemos y creemos en el trabajo cercano
          y transparente.
        </p>
      </div>
      <div className="team-explorer">
        <figure className="team-feature" id="team-feature">
          <div className="team-portrait">
            {site.team.map((member, index) => (
              <img
                key={member.image}
                src={`/images/${member.image}`}
                alt=""
                loading="lazy"
                width="400"
                height="400"
                hidden={index !== selected}
              />
            ))}
          </div>
          <figcaption aria-live="polite" aria-atomic="true">
            <h3>{person.title}</h3>
            <p>Equipo ilustrativo · imágenes de referencia</p>
          </figcaption>
        </figure>
        <div className="team-disciplines" aria-label="Explorá las disciplinas">
          {site.team.map((member, index) => (
            <button
              type="button"
              key={member.title}
              aria-pressed={index === selected}
              aria-controls="team-feature"
              onClick={() => setSelected(index)}
            >
              <img
                src={`/images/${member.image}`}
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
              <span>{member.title}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
