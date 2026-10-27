import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { useMotionEffect } from "../../motion/useMotionEffect";
import { motion } from "../../motion/tokens";
import { createSectionMotion } from "../../motion/createSectionMotion";

interface MotionEffectsProps {
  scope: RefObject<HTMLDivElement | null>;
}

export function MotionEffects({ scope }: MotionEffectsProps) {
  const introduced = useRef(false);

  useMotionEffect(scope, (root, context) => {
    const portal = root.querySelector<HTMLElement>(".portal-landscape");
    const artwork = portal?.querySelector("img");
    const sweep = root.querySelector(".portal-light");
    const listeners: (() => void)[] = [];

    // Only the portal has an entrance sequence. Copy is readable throughout.
    // Do not replay it whenever someone turns animations back on.
    if (!introduced.current) {
      const entrance = gsap.timeline({
        onComplete: () => {
          introduced.current = true;
        }
      });
      if (artwork) {
        entrance.fromTo(artwork, { scale: 1.28 }, {
          scale: 1.08, duration: motion.portal, ease: motion.ease,
        }, 0);
      }
      if (sweep) {
        entrance.fromTo(sweep, { xPercent: -100, opacity: 0 }, {
          xPercent: 100, opacity: 1, duration: 1.5,
          ease: "power2.inOut",
        }, 0).to(sweep, { opacity: 0, duration: 0.45 }, 1.1);
      }
      entrance.fromTo(".hero-copy h1", {
        y: 48, opacity: 0.45, clipPath: "inset(0% 0% 35% 0%)",
      }, {
        y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1, ease: motion.ease,
        clearProps: "transform,opacity,clipPath",
      }, 0).fromTo(".hero-copy > p", { y: 28, opacity: 0.5 }, {
        y: 0, opacity: 1, duration: 0.9,
        ease: motion.ease, clearProps: "transform,opacity",
      }, 0.15);
    } else if (artwork) {
      gsap.set(artwork, { scale: 1.08 });
    }

    const removeSectionMotion = createSectionMotion(root);

    function listen(type: string, handler: EventListener) {
      root.addEventListener(type, handler);
      listeners.push(() => root.removeEventListener(type, handler));
    }

    // Delegation also covers dynamically mounted summary controls and icons.
    // Keyboard focus gets the same feedback as pointer interaction.
    const controlSelector = "a, button:not(:disabled), .service, input:not([type=radio]), textarea";
    function feedback(event: Event, active: boolean) {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest<HTMLElement>(controlSelector);
      if (!control || control.closest(".motion-toggle")) return;
      if (event instanceof FocusEvent && event.relatedTarget instanceof Node &&
        control.contains(event.relatedTarget)) return;
      if (event instanceof MouseEvent && event.relatedTarget instanceof Node &&
        control.contains(event.relatedTarget)) return;
      const icon = control.querySelector("svg, [aria-hidden=true], picture img");
      context.add(() => {
        gsap.to(icon || control, {
          ...(icon ? { x: active ? 9 : 0 } : {
            y: active && !control.matches("input, textarea") ? -3 : 0,
            opacity: 1,
          }),
          duration: motion.feedback, ease: motion.ease, overwrite: "auto",
          ...(!active ? { clearProps: "transform,opacity" } : {}),
        });
      });
    }
    listen("pointerover", ((e: PointerEvent) => {
      if (e.pointerType !== "touch") feedback(e, true);
    }) as EventListener);
    listen("pointerout", ((e: PointerEvent) => {
      if (e.pointerType !== "touch") feedback(e, false);
    }) as EventListener);
    listen("focusin", (e) => feedback(e, true));
    listen("focusout", (e) => feedback(e, false));
    listen("pointerdown", (event) => {
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest("button:not(:disabled), .button, .service");
      if (!control || control.closest(".motion-toggle")) return;
      context.add(() => {
        gsap.fromTo(control, { scale: 0.96 }, {
          scale: 1, duration: 0.3, ease: motion.ease,
          clearProps: "transform", overwrite: "auto",
        });
      });
    });

    function inspectCard(event: Event, active: boolean) {
      if (!(event instanceof PointerEvent) || event.pointerType === "touch" ||
        !(event.target instanceof Element)) return;
      const card = event.target.closest("[data-motion-card]");
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      const image = card.querySelector("img");
      if (!image) return;
      context.add(() => {
        gsap.to(image, {
          scale: active ? 1.1 : 1,
          duration: motion.continuity,
          ease: motion.ease,
          overwrite: "auto",
          ...(!active ? { clearProps: "transform" } : {}),
        });
      });
    }
    listen("pointerover", (e) => inspectCard(e, true));
    listen("pointerout", (e) => inspectCard(e, false));

    // Reuse two tweens for hero depth; never install a global mousemove loop.
    if (artwork && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const x = gsap.quickTo(artwork, "x", { duration: motion.continuity, ease: motion.ease });
      const y = gsap.quickTo(artwork, "y", { duration: motion.continuity, ease: motion.ease });
      const hero = root.querySelector<HTMLElement>(".hero");
      const move = (event: PointerEvent) => {
        if (!hero || event.pointerType === "touch") return;
        const box = hero.getBoundingClientRect();
        x(((event.clientX - box.left) / box.width - 0.5) * 32);
        y(((event.clientY - box.top) / box.height - 0.5) * 20);
      };
      const reset = () => { x(0); y(0); };
      hero?.addEventListener("pointermove", move);
      hero?.addEventListener("pointerleave", reset);
      listeners.push(() => {
        hero?.removeEventListener("pointermove", move);
        hero?.removeEventListener("pointerleave", reset);
      });
    }

    return () => {
      removeSectionMotion();
      listeners.forEach((remove) => remove());
    };
  });

  return null;
}
