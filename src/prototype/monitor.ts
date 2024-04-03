import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addWidget, getWidgetById, getWidgets } from '../redux/slices/cmSlice';
import type { Widget } from '../types/modalities';

type MonitorProps = {
  // define expected input here and it's type (number, string, etc.)
  widgets: Widget[]
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const monitor = ({widgets}: MonitorProps) => {
  console.log('monitor went off!');

  widgets.forEach(function(widget,widgetIndex){
    widget.elements.forEach(function(element, elementIndex) {
      if (element.expiration){
        const time = new Date().toISOString();
        if(element.expiration <= time){
          console.log("element " + element.id + " expired!")
        }
      }
    });
  });
};

export default monitor;
