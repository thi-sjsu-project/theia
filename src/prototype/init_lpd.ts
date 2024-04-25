import { createElement } from 'react';
import { createWidget } from 'src/utils/lpdHelper';

// Initial LPD
const element = [createElement('element1', 'text', 20, 20, 10, 10, 0, 'never', 'delete', false, false)]

const initialLPD = {
  widgets: [
    // Create widget with an element
    createWidget('request', 'request', 0, 0, 140, 80, false, true, 1, element, {
      backgroundColor: 'red',
      position: 'absolute',
      opacity: 0.5,
      border: 'solid',
      zIndex: 100,
    }),
  ],
};

export default initialLPD;