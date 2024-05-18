// Namespace import since we export all the types from these files
import type * as Element from 'src/types/element';
import type * as Widget from 'src/types/widget';

import type { Properties } from 'csstype';
import type { Modality } from 'src/types/modality';
import type { Screen, Section, SectionType } from 'src/types/support-types';
import type {
  MissileToOwnshipDetected,
  RequestApprovalToAttack,
} from 'src/types/schema-types';

// Functions to create sections, widgets, and elements
const generateSection = (
  id: string,
  screen: Screen,
  x: number,
  y: number,
  w: number,
  h: number,
  priority: number,
  type: SectionType,
  widgetIDs: string[],
): Section => ({
  id,
  screen,
  x,
  y,
  w,
  h,
  priority,
  type,
  widgetIDs,
});

const generateCluster = (widgets: any[]) => ({
  widgets: widgets,
});

// Generate Base Widget
const generateBaseWidget = (
  id: string,
  sectionType: SectionType,
  x: number,
  y: number,
  w: number,
  h: number,
  screen: Screen,
  canOverlap: boolean,
  useElementLocation: boolean,
  maxAmount: number,
  elements: Element.Element[],
  padding?: number,
  priority?: number,
  style?: Properties,
): Widget.BaseWidget => ({
  id,
  sectionType,
  x,
  y,
  w,
  h,
  screen,
  canOverlap,
  useElementLocation,
  maxAmount,
  padding,
  priority,
  style,
  elements,
});

// Generate the different widget types
const generateListWidget = (
  baseWidget: Widget.BaseWidget,
  maxElements?: number,
): Widget.ListWidget => ({
  ...baseWidget,
  type: 'list',
  maxElements,
});

const generateGridWidget = (
  baseWidget: Widget.BaseWidget,
  rows: number,
  cols: number,
): Widget.GridWidget => ({
  ...baseWidget,
  type: 'grid',
  rows,
  cols,
});

const generateVehicleWidget = (
  baseWidget: Widget.BaseWidget,
  vehicleId: number,
  speed: number,
  rotation: number,
): Widget.VehicleWidget => ({
  ...baseWidget,
  type: 'vehicle',
  vehicleId,
  speed,
  rotation,
});

const generateCustomWidget = (
  baseWidget: Widget.BaseWidget,
): Widget.CustomWidget => ({
  ...baseWidget,
  type: 'custom',
});

// Generate Base Element
const generateBaseElement = (
  id: string,
  modality: Modality,
  h: number,
  w: number,
  priority?: number,
  widgetId?: string,
  collapsed?: boolean,
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
  widgetId,
  priority,
  collapsed,
  expirationInterval,
  expiration,
  onExpiration,
  interacted,
});

// Generate simple elements
const generateIconElement = (
  baseElement: Element.BaseElement,
  src: string,
  tag?: string,
): Element.IconElement => ({
  ...baseElement,
  type: 'icon',
  src,
  tag,
});

const generateTableElement = (
  baseElement: Element.BaseElement,
  rows: number,
  cols: number,
  tableData: string[][],
): Element.TableElement => ({
  ...baseElement,
  type: 'table',
  rows,
  cols,
  tableData,
});

const generateButtonElement = (
  baseElement: Element.BaseElement,
  text: string,
  onClick?: () => void,
): Element.ButtonElement => ({
  ...baseElement,
  type: 'button',
  text,
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

// Generate complex elements
const generateMissileIncomingElement = (
  baseElement: Element.BaseElement,
  message: MissileToOwnshipDetected,
  icon: Element.IconElement,
): Element.MissileIncomingElement => ({
  ...baseElement,
  type: 'missile-incoming',
  message,
  icon,
});

const generateRequestApprovalElement = (
  baseElement: Element.BaseElement,
  message: RequestApprovalToAttack,
  icon: Element.IconElement,
  leftButton: Element.ButtonElement,
  rightButton: Element.ButtonElement,
): Element.RequestApprovalElement => ({
  ...baseElement,
  type: 'request-approval',
  message,
  icon,
  leftButton,
  rightButton,
});

const lpdHelper = {
  generateBaseWidget,
  generateListWidget,
  generateGridWidget,
  generateVehicleWidget,
  generateCustomWidget,
  generateSection,
  generateBaseElement,
  generateIconElement,
  generateTableElement,
  generateButtonElement,
  generateTextElement,
  generateImageElement,
  generateAudioElement,
  generateMissileIncomingElement,
  generateRequestApprovalElement,
};

export default lpdHelper;
