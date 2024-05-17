import { type AcaStatusElement } from 'src/types/element';
import type { AcaHeaderWidget } from 'src/types/widget';
import { v4 as uuid } from 'uuid';

const aca1: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca2: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca3: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca4: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca5: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca6: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad: 0.5,
  h: 80,
  w: 132,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};

const acaHeaderElements: AcaStatusElement[] = [aca1, aca2, aca3, aca4, aca5];

const initialAcaHeaderWidget: AcaHeaderWidget = {
  id: 'aca-header',
  sectionType: 'top-bar',
  screen: '/minimap',
  type: 'aca-header',
  x: 0,
  y: 0,
  w: 1920,
  h: 80,
  canOverlap: false,
  useElementLocation: false,
  maxAmount: 2,
  elements: [...acaHeaderElements],
};

export { initialAcaHeaderWidget, acaHeaderElements };
