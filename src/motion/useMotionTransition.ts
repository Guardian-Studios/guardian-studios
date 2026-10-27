import { useRef, type DependencyList } from "react";
import { gsap } from "gsap";
import { useMotionEffect } from "./useMotionEffect";
import { motion } from "./tokens";

// State is committed by React immediately; motion never delays content or focus.
export function useMotionTransition<T extends HTMLElement>(
  selector: string,
  dependencies: DependencyList,
  direction = 0,
) {
  const ref = useRef<T>(null);
  useMotionEffect(ref, (element) => {
    const targets = selector ? element.querySelectorAll(selector) : element;
    gsap.fromTo(targets, {
      opacity: 0.45,
      x: direction * 48,
      y: direction ? 0 : 24,
      clipPath: "inset(0% 0% 12% 0%)",
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: motion.state,
      ease: motion.ease,
      clearProps: "opacity,transform,clipPath",
    });
  }, dependencies);
  return ref;
}
