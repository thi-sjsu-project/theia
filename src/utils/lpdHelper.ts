import type { SectionType } from "src/types/support-types";
import type { Widget, WidgetType } from "src/types/widget";

// Functions to create widgets, elements, and sections
// Widget creation functions with parameters
export const createWidget = (
  id: string,
  type: WidgetType,
  x: number,
  y: number,
  w: number,
  h: number,
  canOverlap: boolean,
  useElementLocation: boolean,
  maxElements: number,
  elements: Element[],
  style?: object,
): Widget => ({
  id,
  type,
  x,
  y,
  w,
  h,
  canOverlap,
  useElementLocation,
  maxElements,
  style,
  elements: [],
});

// Element creation functions with parameters
export const createElement = (
  id: string,
  modality: string,
  h: number,
  w: number,
  xWidget: number,
  yWidget: number,
  expirationInterval?: number,
  expiration?: string,
  onExpiration?: "delete" | "escalate" | "deescalate",
  interacted?: boolean,
  canOverlap?: boolean,
  style?: object
) => ({
  id,
  modality,
  h,
  w,
  xWidget,
  yWidget,
  expirationInterval,
  expiration,
  onExpiration,
  interacted,
  canOverlap,
  style,
});

// Section creation functions with parameters
export const createSection = (
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  priority: number,
  type: SectionType
) => ({
  id,
  x,
  y,
  w,
  h,
  priority,
  type
});

// Pass in a message and return a widget
