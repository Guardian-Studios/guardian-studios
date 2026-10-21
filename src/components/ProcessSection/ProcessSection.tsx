import { site } from "../../config/site";
export function ProcessSection() {
  return (
    <section
      className="process wrap section"
      id="proceso"
      aria-labelledby="process-title"
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
      <ol className="steps">
        {site.steps.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
