import type { Element } from "./element";

export type SortMethod = (a: Element, b: Element) => number;

export type SortTypes = 'gaia' | 'priority' | 'time';