export const motionStorageKey = "guardian-motion";
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function readMotionPreference(storage: Pick<Storage, "getItem">) {
  try {
    return storage.getItem(motionStorageKey) !== "off";
  } catch {
    return true;
  }
}

export function saveMotionPreference(
  storage: Pick<Storage, "setItem">,
  enabled: boolean,
) {
  try {
    storage.setItem(motionStorageKey, enabled ? "on" : "off");
  } catch {
    // The preference still works for this visit when storage is unavailable.
  }
}

export function allowsMotion(requested: boolean, systemReduced: boolean) {
  return requested && !systemReduced;
}
