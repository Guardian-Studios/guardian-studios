import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

// One choreography per surface, tied to its composition rather than a repeated
// whole-section fade. No pre-hidden content, scroll pinning, or scroll locking.
export function createSectionMotion(root: HTMLElement) {
  const responsive = gsap.matchMedia(root);
  responsive.add({
    narrow: "(max-width: 700px)",
    wide: "(min-width: 701px)",
  }, (context) => {
    const narrow = Boolean(context.conditions?.narrow);
    const distance = narrow ? 32 : 64;

    function sequence(selector: string) {
      const element = root.querySelector(selector);
      if (!element) return null;
      return gsap.timeline({
        defaults: {
          duration: motion.entrance,
          ease: motion.ease,
          immediateRender: false,
        },
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    }

    const finish = { x: 0, y: 0, opacity: 1, clearProps: "transform,opacity,clipPath" };
    sequence(".hero-explorer")?.fromTo(
      ".hero-explorer .service-picker",
      { y: 54, opacity: 0.5 },
      finish,
    );

    sequence('[data-motion="studio"]')
      ?.fromTo(".studio-art img", {
        scale: 1.18,
        clipPath: "inset(8% 18% 8% 0%)",
      }, {
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.25,
        clearProps: "transform,clipPath",
      }, 0)
      .fromTo(".studio-copy", {
        x: narrow ? 0 : distance,
        y: narrow ? distance : 0,
        opacity: 0.5,
      }, finish, 0.12);

    sequence('[data-motion="team"]')
      ?.fromTo(".team-feature", { y: distance, opacity: 0.5 }, finish, 0)
      .fromTo(".team-disciplines button", {
        x: narrow ? 0 : 36,
        y: narrow ? 24 : 0,
        opacity: 0.5,
      }, { ...finish, stagger: 0.1, duration: 0.7 }, 0.12);

    root.querySelectorAll(".projects figure").forEach((card, index) => {
      const image = card.querySelector("img");
      const caption = card.querySelector("figcaption");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 86%",
          toggleActions: "play none none none",
        },
        defaults: { immediateRender: false, ease: motion.ease },
      });
      timeline.fromTo(image, {
        scale: 1.16,
        clipPath: index % 2 ? "inset(0% 0% 0% 85%)" : "inset(0% 85% 0% 0%)",
      }, {
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.15,
        clearProps: "transform,clipPath",
      }).fromTo(caption, { y: 32, opacity: 0.5 }, {
        ...finish, duration: 0.7,
      }, 0.2);
    });

    sequence('[data-motion="process"]')
      ?.fromTo(".process-rail-number", { scale: 0.55 }, {
        scale: 1,
        stagger: 0.11,
        duration: 0.7,
        clearProps: "transform",
      }, 0)
      .fromTo(".process-feature", {
        x: narrow ? 0 : distance,
        y: narrow ? 40 : 0,
        opacity: 0.5,
      }, finish, 0.1);

    sequence('[data-motion="launch"]')
      ?.fromTo(".upload-icon", { y: 64, scale: 0.65, rotation: -10 }, {
        y: 0, scale: 1, rotation: 0, duration: 1.05,
        clearProps: "transform",
      }, 0)
      .fromTo(".mvp-inner > div", { y: 36, opacity: 0.5 }, finish, 0.15);

    sequence('[data-motion="contact"]')
      ?.fromTo(".contact-copy", { y: 40, opacity: 0.5 }, finish, 0)
      .fromTo(".contact-form", { y: 64, opacity: 0.5 }, finish, 0.14);

    sequence('[data-motion="footer"]')
      ?.fromTo(".site-footer .brand", { y: 28, opacity: 0.5 }, finish, 0)
      .fromTo(".site-footer nav a", { y: 18, opacity: 0.5 }, {
        ...finish, stagger: 0.06, duration: 0.6,
      }, 0.1);

    const hero = root.querySelector(".hero");
    const artwork = root.querySelector(".portal-landscape img");
    if (hero && artwork) {
      gsap.to(artwork, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }
  });
  return () => responsive.revert();
}
