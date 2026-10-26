export const site = {
  name: "Guardian Studios",
  location: "Costa Rica",
  description:
    "Diseñamos y desarrollamos soluciones digitales que ayudan a personas, negocios y empresas a avanzar con confianza.",
  // Set a verified address to enable the email handoff. No message is sent by this static site.
  contactEmail: null as string | null,
  navigation: [
    { href: "#trabajo", label: "Trabajo" },
    { href: "#proceso", label: "Cómo trabajamos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ],
  services: [
    "Un sitio web",
    "Una aplicación",
    "Mejorar lo que ya tengo",
    "Todavía no lo sé",
  ],
  servicePrompts: [
    {
      question: "¿Qué debería poder hacer tu sitio?",
      description:
        "Podemos empezar por las personas que lo van a visitar y lo que querés que encuentren.",
    },
    {
      question: "¿Qué necesitás hacer más simple?",
      description:
        "Contanos la tarea o la experiencia que imaginás para tu aplicación.",
    },
    {
      question: "¿Qué te gustaría mejorar?",
      description:
        "Podemos empezar por lo que ya tenés y lo que querés que funcione mejor.",
    },
    {
      question: "Empecemos por tu idea.",
      description:
        "Contanos qué querés lograr. No hace falta tener todos los detalles resueltos.",
    },
  ],
  team: [
    { title: "Diseño y experiencia", image: "team-design.jpg" },
    { title: "Desarrollo y tecnología", image: "team-development.jpg" },
    { title: "Estrategia y producto", image: "team-strategy.jpg" },
  ],
  projects: [
    {
      title: "Tienda en línea",
      description: "E-commerce con una experiencia de compra simple y moderna.",
      image: "work-store.jpg",
    },
    {
      title: "Plataforma de reservas",
      description: "Sistema de citas para profesionales y negocios.",
      image: "work-booking.jpg",
    },
  ],
  steps: [
    {
      title: "Entender",
      description:
        "Conversamos sobre tu idea, tus objetivos y las personas a las que querés llegar.",
    },
    {
      title: "Diseñar",
      description:
        "Transformamos ideas en experiencias visuales y funcionales.",
    },
    {
      title: "Desarrollar",
      description: "Construimos una solución a la medida de tu proyecto.",
    },
    {
      title: "Afinar",
      description: "Probamos, ajustamos y te acompañamos en el lanzamiento.",
    },
  ],
} as const;
