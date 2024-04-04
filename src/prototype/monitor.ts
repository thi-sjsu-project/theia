import { AppDispatch,  RootState, AppStore} from 'src/redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addWidget, getWidgetById, getWidgets, updateWidgetDelete } from '../redux/slices/cmSlice';
import type { Widget } from '../types/modalities';
import store from "src/redux/store"


type MonitorProps = {
  // define expected input here and it's type (number, string, etc.)
  dispatch: AppDispatch
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const monitor = ({dispatch}: MonitorProps) => {
  const widgets = store.getState().cm.widgets
  console.log(widgets)
  
  console.log('monitor went off!');
  widgets.forEach(function(widget,widgetIndex){ //go through each widget
    widget.elements.forEach(function(element, elementIndex) { //go through each element
      if (element.expiration){
        const time = new Date().toISOString();
        if(element.expiration <= time){
          //console.log("element " + element.id + " expired! deleting...")
          if(element.onExpiration === "delete"){
            dispatch(updateWidgetDelete(element.id))
          } 
        }
      }
    });
  });
};

export default monitor;
