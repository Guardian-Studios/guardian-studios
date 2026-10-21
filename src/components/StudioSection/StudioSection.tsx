import { site } from "../../config/site";
export function StudioSection() {
  return (
    <section
      className="studio section"
      id="nosotros"
      aria-labelledby="studio-title"
      data-motion="studio"
    >
      <div className="studio-art">
        <img
          src="/images/studio.jpg"
          width="1536"
          height="1024"
          alt="Emblema metálico de Guardian Studios sobre una cubierta oscura"
          loading="lazy"
        />
      </div>
      <div className="studio-copy">
        <h2 id="studio-title">
          Somos Guardian Studios,
          <br />
          desde {site.location}.
        </h2>
        <p>{site.description}</p>
        <p>
          Nos mueve la tecnología, la creatividad y la convicción de que un buen
          proyecto puede generar un impacto real. Por eso, trabajamos de forma
          cercana, escuchando, proponiendo y construyendo juntos.
        </p>
        <ul className="values">
          <li>
            Cercanía
            <br />y comunicación
          </li>
          <li>
            Soluciones
            <br />a la medida
          </li>
          <li>
            Para personas,
            <br />
            negocios y empresas
          </li>
        </ul>
      </div>
    </section>
  );
}
