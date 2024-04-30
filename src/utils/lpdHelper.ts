// Namespace import since we export all the types from these files
import type * as Element from "src/types/element";
import type * as Widget from "src/types/widget";

import type { Properties } from "csstype";
import type { Modality } from "src/types/modality";
import type { Section, SectionType } from "src/types/support-types";

// Functions to create sections, widgets, and elements
const generateSection = (
  x: number,
  y: number,
  w: number,
  h: number,
  priority: number,
  type: SectionType,
): Section => ({
  x,
  y,
  w,
  h,
  priority,
  type,
});

const generateWidget = (
  id: string,
  type: Widget.WidgetType,
  x: number,
  y: number,
  w: number,
  h: number,
  canOverlap: boolean,
  useElementLocation: boolean,
  maxElements: number,
  elements: Element.Element[],
  style?: Properties,
): Widget.Widget => ({
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
  elements,
});

const generateBaseElement = (
  id: string,
  modality: Modality,
  h: number,
  w: number,
  xWidget: number,
  yWidget: number,
  expirationInterval?: number,
  expiration?: string,
  onExpiration?: 'delete' | 'escalate' | 'deescalate',
  interacted?: boolean,
  canOverlap?: boolean,
  style?: Properties,
): Element.BaseElement => ({
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

// Element creation for each Element type
const generateIconElement = (
  baseElement: Element.BaseElement,
  src: string,
): Element.IconElement => ({
  ...baseElement,
  type: 'icon',
  src,
});

const generateTableElement = (
  baseElement: Element.BaseElement,
  rows: number,
  cols: number,
  data: string[][],
): Element.TableElement => ({
  ...baseElement,
  type: 'table',
  rows,
  cols,
  data,
});

const generateButtonElement = (
  baseElement: Element.BaseElement,
  onClick: () => void,
): Element.ButtonElement => ({
  ...baseElement,
  type: 'button',
  onClick,
});

const generateTextElement = (
  baseElement: Element.BaseElement,
  text: string,
): Element.TextElement => ({
  ...baseElement,
  type: 'text',
  text,
});

const generateImageElement = (
  baseElement: Element.BaseElement,
  src: string,
): Element.ImageElement => ({
  ...baseElement,
  type: 'image',
  src,
});

const generateAudioElement = (
  baseElement: Element.BaseElement,
  intensity: number,
  frequency: number,
): Element.AudioElement => ({
  ...baseElement,
  type: 'audio',
  intensity,
  frequency,
});

const lpdHelper = {
  generateWidget,
  generateSection,
  generateBaseElement,
  generateIconElement,
  generateTableElement,
  generateButtonElement,
  generateTextElement,
  generateImageElement,
  generateAudioElement,
};

export default lpdHelper;