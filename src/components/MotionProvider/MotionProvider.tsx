import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MotionContext } from "../../motion/MotionContext";
import { MotionEffects } from "./MotionEffects";
import {
  allowsMotion,
  motionStorageKey,
  readMotionPreference,
  reducedMotionQuery,
  saveMotionPreference,
} from "../../motion/preferences";

function readPreference() {
  try {
    return readMotionPreference(localStorage);
  } catch {
    return true;
  }
}

export function MotionProvider({ children }: { children: ReactNode; }) {
  const [requested, setRequested] = useState(readPreference);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(reducedMotionQuery).matches,
  );
  const scope = useRef<HTMLDivElement>(null);
  const enabled = allowsMotion(requested, reducedMotion);

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const update = () => setReducedMotion(media.matches);
    const sync = (event: StorageEvent) => {
      if (event.key === motionStorageKey || event.key === null) {
        setRequested(readPreference());
      }
    };
    update();
    media.addEventListener("change", update);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = enabled ? "on" : "off";
    return () => {
      delete root.dataset.motion;
    };
  }, [enabled]);

  const toggle = useCallback(() => {
    const next = !requested;
    setRequested(next);
    try {
      saveMotionPreference(localStorage, next);
    } catch {
      // Storage may be blocked; the choice still applies for this visit.
    }
  }, [requested]);

  const settings = useMemo(
    () => ({ enabled, reducedMotion, toggle }),
    [enabled, reducedMotion, toggle],
  );

  return (
    <MotionContext.Provider value={settings}>
      <div ref={scope} className="motion-root">
        {children}
      </div>
      {/* The host ref must be attached before MotionEffects' layout effect. */}
      <MotionEffects scope={scope} />
    </MotionContext.Provider>
  );
}
