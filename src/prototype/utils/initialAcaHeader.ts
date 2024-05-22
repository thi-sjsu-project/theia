import { type AcaStatusElement } from 'src/types/element';
import type { AcaHeaderWidget } from 'src/types/widget';
import { v4 as uuid } from 'uuid';

const aca1: AcaStatusElement = {
  type: 'aca-status',
  acaId: 1,
  fuelLevel: 0.5,
  weaponLoad1: 0.5,
  weaponLoad2: 0.2,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca2: AcaStatusElement = {
  type: 'aca-status',
  acaId: 2,
  fuelLevel: 0.2,
  weaponLoad1: 0.5,
  weaponLoad2: 0.75,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca3: AcaStatusElement = {
  type: 'aca-status',
  acaId: 3,
  fuelLevel: 0.9,
  weaponLoad1: 1,
  weaponLoad2: 0.25,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca4: AcaStatusElement = {
  type: 'aca-status',
  acaId: 4,
  fuelLevel: 0.15,
  weaponLoad1: 0.25,
  weaponLoad2: 0.75,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca5: AcaStatusElement = {
  type: 'aca-status',
  acaId: 5,
  fuelLevel: 0.75,
  weaponLoad1: 0.5,
  weaponLoad2: 0.5,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca6: AcaStatusElement = {
  type: 'aca-status',
  acaId: 6,
  fuelLevel: 0.5,
  weaponLoad1: 1,
  weaponLoad2: 0.75,
  isDead: true,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca7: AcaStatusElement = {
  type: 'aca-status',
  acaId: 7,
  fuelLevel: 0.6,
  weaponLoad1: 0.5,
  weaponLoad2: 0,
  isDead: false,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};
const aca8: AcaStatusElement = {
  type: 'aca-status',
  acaId: 8,
  fuelLevel: 0.3,
  weaponLoad1: 0,
  weaponLoad2: 0.25,
  isDead: true,
  h: 72,
  w: 160,
  id: uuid(),
  modality: 'visual',
  widgetId: 'aca-header',
};

const acaHeaderElements: AcaStatusElement[] = [
  aca1,
  aca2,
  aca3,
  aca4,
  aca5,
  aca6,
  aca7,
  aca8,
];

const initialAcaHeaderWidget: AcaHeaderWidget = {
  id: 'aca-header',
  sectionType: 'top-bar',
  screen: '/minimap',
  type: 'aca-header',
  x: 0,
  y: 0,
  w: 1920,
  h: 88,
  canOverlap: false,
  useElementLocation: false,
  maxAmount: 2,
  elements: [...acaHeaderElements],
  tags: ['header'],
};

export { initialAcaHeaderWidget, acaHeaderElements };
