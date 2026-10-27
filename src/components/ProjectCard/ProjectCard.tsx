import type { site } from "../../config/site";
interface ProjectCardProps {
  project: (typeof site.projects)[number];
}
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <figure data-motion-card>
      <div className="project-image-frame">
        <img
          src={`/images/${project.image}`}
          width="312"
          height="198"
          alt={`Vista ilustrativa: ${project.title}`}
          loading="lazy"
        />
      </div>
      <figcaption>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <small>Contenido de ejemplo</small>
      </figcaption>
    </figure>
  );
}
