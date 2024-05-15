import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';

const pearceScreenSections = [
  // the top-bar on the pearce-screen
  lpdHelper.generateSection(
    uuid(),
    '/pearce-screen',
    0,
    0,
    1920,
    100,
    0,
    'top-bar',
    [],
  ),

  // left video box section
  lpdHelper.generateSection(
    uuid(),
    '/pearce-screen',
    50,
    150,
    500,
    350,
    10,
    'map-video',
    [],
  ),

  // left map box section
  lpdHelper.generateSection(
    uuid(),
    '/pearce-screen',
    50,
    550,
    500,
    350,
    10,
    'map-video',
    [],
  ),

  // center box section (with history and expanded messages)
  lpdHelper.generateSection(
    uuid(),
    '/pearce-screen',
    750,
    150,
    600,
    800,
    10,
    'history',
    [],
  ),

  // right screen section
  lpdHelper.generateSection(
    uuid(),
    '/pearce-screen',
    1550,
    150,
    350,
    900,
    10,
    'tinder',
    [],
  ),
];

const initialMinimapSections = [
  // the top-bar on the minimap screen
  lpdHelper.generateSection(
    uuid(),
    '/minimap',
    0,
    0,
    1920,
    100,
    0,
    'tinder',
    [],
  ),
  // minimap section (where drones move)
  lpdHelper.generateSection(
    uuid(),
    '/minimap',
    0,
    100,
    1920,
    980,
    0,
    'vehicle',
    [],
  ),
];

const initialSections = [...pearceScreenSections, ...initialMinimapSections];

export default initialSections;
