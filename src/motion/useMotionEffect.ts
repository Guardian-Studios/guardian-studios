import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "gsap";
import { useMotion } from "./MotionContext";

// Context owns all inline styles and tweens, including interrupted transitions.
// Revert restores the static layout when motion is disabled or React unmounts.
export function useMotionEffect<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (element: T, context: gsap.Context) => void | (() => void),
  dependencies: DependencyList = [],
) {
  const { enabled } = useMotion();
  useLayoutEffect(() => {
    const element = scope.current;
    if (!enabled || !element) return;
    const context = gsap.context((ctx) => setup(element, ctx), element);
    return () => context.revert();
    // The caller supplies the reactive inputs to the GSAP setup, like an effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, scope, ...dependencies]);
}
