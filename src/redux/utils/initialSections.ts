import type { Section } from 'src/types/support-types';
import { v4 as uuid } from 'uuid';

const tinderSection: Section = {
  id: uuid(),
  x: 50,
  y: 40,
  w: 200,
  h: 800,
  priority: 10,
  type: 'tinder',
  widgetIDs: [],
};

const requestSection: Section = {
  id: uuid(),
  x: 50,
  y: 850,
  w: 800,
  h: 200,
  priority: 10,
  type: 'request',
  widgetIDs: [],
};

const highWarningSection: Section = {
  id: uuid(),
  x: 800,
  y: 200,
  w: 500,
  h: 250,
  priority: 10,
  type: 'highWarning',
  widgetIDs: [],
};

const lowWarningSection: Section = {
  id: uuid(),
  x: 1800,
  y: 450,
  w: 500,
  h: 200,
  priority: 10,
  type: 'lowWarning',
  widgetIDs: [],
};

const messageSection: Section = {
  id: uuid(),
  x: 1800,
  y: 200,
  w: 200,
  h: 200,
  priority: 10,
  type: 'message',
  widgetIDs: [],
};

export const initialSections = [
  tinderSection,
  requestSection,
  highWarningSection,
  lowWarningSection,
  messageSection,
];
