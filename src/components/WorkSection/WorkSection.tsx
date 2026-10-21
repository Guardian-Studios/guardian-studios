import { ProjectCard } from "../ProjectCard/ProjectCard";
import { site } from "../../config/site";
export function WorkSection() {
  return (
    <section
      className="work section"
      id="trabajo"
      aria-labelledby="work-title"
      data-motion="work"
    >
      <div className="wrap">
        <div className="work-intro">
          <h2 id="work-title">
            Ideas convertidas
            <br />
            en experiencias.
          </h2>
          <p>
            Diseños y desarrollos que se adaptan a diferentes necesidades, desde
            sitios web hasta aplicaciones a la medida.
          </p>
          <p className="caption">Proyectos de ejemplo</p>
        </div>
        <div className="projects">
          {site.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
