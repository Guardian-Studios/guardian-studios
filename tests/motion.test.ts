import assert from "node:assert/strict";
import test from "node:test";
import {
  allowsMotion,
  motionStorageKey,
  readMotionPreference,
  saveMotionPreference,
} from "../src/motion/preferences.ts";

test("system reduced motion overrides an explicit saved on preference", () => {
  const requested = readMotionPreference({ getItem: () => "on" });
  assert.equal(allowsMotion(requested, true), false);
  assert.equal(allowsMotion(requested, false), true);
});

test("saved off remains off when the system allows motion", () => {
  const requested = readMotionPreference({ getItem: () => "off" });
  assert.equal(allowsMotion(requested, false), false);
  assert.equal(allowsMotion(requested, true), false);
});

test("a new visitor follows the system preference", () => {
  const requested = readMotionPreference({ getItem: () => null });
  assert.equal(allowsMotion(requested, true), false);
  assert.equal(allowsMotion(requested, false), true);
});

test("off survives a preference save and subsequent page load", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
  saveMotionPreference(storage, false);
  assert.equal(values.get(motionStorageKey), "off");
  assert.equal(readMotionPreference(storage), false);
  saveMotionPreference(storage, true);
  assert.equal(readMotionPreference(storage), true);
});

test("denied storage does not break the site or bypass reduced motion", () => {
  const blocked = {
    getItem: () => { throw new Error("Storage unavailable"); },
    setItem: () => { throw new Error("Storage unavailable"); },
  };
  assert.doesNotThrow(() => saveMotionPreference(blocked, false));
  assert.equal(allowsMotion(readMotionPreference(blocked), true), false);
});

test("an invalid saved value still honors system reduced motion", () => {
  const requested = readMotionPreference({ getItem: () => "invalid" });
  assert.equal(allowsMotion(requested, true), false);
});
