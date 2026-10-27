import type { site } from "../../config/site";
interface TeamMemberCardProps {
  person: (typeof site.team)[number];
}
export function TeamMemberCard({ person }: TeamMemberCardProps) {
  return (
    <figure data-motion-card>
      <img
        src={`/images/${person.image}`}
        alt=""
        width="129"
        height="127"
        loading="lazy"
      />
      <figcaption>
        {person.title}
        <small>Perfil de ejemplo</small>
      </figcaption>
    </figure>
  );
}
