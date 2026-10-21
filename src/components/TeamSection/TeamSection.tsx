import { TeamMemberCard } from "../TeamMemberCard/TeamMemberCard";
import { site } from "../../config/site";
export function TeamSection() {
  return (
    <section className="team wrap section" aria-labelledby="team-title">
      <div>
        <h2 id="team-title">Conocé al equipo</h2>
        <p>
          Un equipo multidisciplinario que combina diseño, desarrollo y
          estrategia. Nos encanta lo que hacemos y creemos en el trabajo cercano
          y transparente.
        </p>
        <p className="caption">Equipo ilustrativo · imágenes de referencia</p>
      </div>
      <div className="team-grid">
        {site.team.map((person) => (
          <TeamMemberCard key={person.title} person={person} />
        ))}
      </div>
    </section>
  );
}
