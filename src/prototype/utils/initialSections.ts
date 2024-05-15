import lpdHelper from 'src/utils/lpdHelper';
import { v4 as uuid } from 'uuid';

const pearceScreenSections = [
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

const initialSections = [...pearceScreenSections];

export default initialSections;
