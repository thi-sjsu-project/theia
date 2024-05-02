import type { AppDispatch } from 'src/redux/store';
import {
  removeWidget,
  deleteElementFromWidget,
} from 'src/redux/slices/minimapSlice';
import store from 'src/redux/store';

type MonitorProps = {
  // define expected input here and it's type (number, string, etc.)
  dispatch: AppDispatch;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const monitor = ({ dispatch }: MonitorProps) => {
  const widgets = store.getState().minimap.widgets;

  Object.keys(widgets).forEach((widgetId) => {
    const widget = widgets[widgetId];

    widget.elements.forEach((element, elementIndex) => {
      //go through each element
      if (element.expiration && !element.interacted) {
        const time = new Date().toISOString();

        if (element.expiration <= time) {
          console.log('element ' + element.id + ' expired! deleting...');

          if (element.onExpiration === 'delete') {
            if (widget.elements.length === 1) {
              console.log('widget length 1');
              dispatch(removeWidget(widget.id));
            } else {
              dispatch(deleteElementFromWidget(widgetId, element.id));
            }
          }
        }
      }
    });
  });
};

export default monitor;
