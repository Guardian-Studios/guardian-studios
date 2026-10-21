import { site } from "../../config/site";

export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label={`${site.name}, inicio`}>
      <picture>
        <source media="(max-width: 700px)" srcSet="/emblem.svg" />
        <img
          src="/guardian-horizontal-white.svg"
          alt=""
          width="2080"
          height="650"
        />
      </picture>
    </a>
  );
}
