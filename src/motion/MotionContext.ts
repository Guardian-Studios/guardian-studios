import { createContext, useContext } from "react";

export interface MotionSettings {
  enabled: boolean;
  reducedMotion: boolean;
  toggle: () => void;
}

export const MotionContext = createContext<MotionSettings | null>(null);

export function useMotion() {
  const settings = useContext(MotionContext);
  if (!settings) throw new Error("Motion components require MotionProvider");
  return settings;
}
