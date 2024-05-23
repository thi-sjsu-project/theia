import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import {
  updateElement,
  updateElementExpiration,
} from 'src/redux/slices/minimapSlice';
import { useEffect } from 'react';
import type {
  IconElement as IconElementType,
  InformationElement as InformationElementType,
} from 'src/types/element';
import IconElement from 'src/components/Element/Simple/IconElement';
import MapThreatInfoElement from '../Element/Complex/MapThreatInfoElement';

type MapWarningWidgetProps = {
  widget: MapWarningWidgetType;
};

const MapWarningWidget = ({ widget }: MapWarningWidgetProps) => {
  const [iconElement, threatInfoElement] = widget.elements;

  const elementsInGaze = useAppSelector(getElementsInGaze);
  const dispatch = useAppDispatch();

  const inGaze = elementsInGaze.some(
    (element) => element.id === iconElement.id,
  );

  useEffect(() => {
    // show threat info element if icon element is in gaze
    if (inGaze && threatInfoElement.collapsed) {
      dispatch(
        updateElement(widget.id, { ...threatInfoElement, collapsed: false }),
      );
    }

    if (inGaze && threatInfoElement.expirationIntervalMs) {
      // update expiration even if only icon element is in gaze
      // keep displaying threat info element while we hover over the icon
      dispatch(updateElementExpiration(widget.id, threatInfoElement.id));
    }
  }, [inGaze, dispatch, iconElement, threatInfoElement, widget.id]);

  return (
    <div
      key={widget.id}
      id={widget.id}
      className="absolute"
      style={{
        top: ~~widget.y,
        left: ~~widget.x,
      }}
    >
      <div className="inline-block">
        <div className="flex justify-center items-center">
          <IconElement element={iconElement as IconElementType} />
          {!threatInfoElement.collapsed && (
            <div style={{ height: 2, width: 75, border: '2px dashed white' }} className="inline-block align-[2.375rem]" />
          )}
        </div>
      </div>
      {!threatInfoElement.collapsed && (
        <div className="inline-block align-top mt-2">
          <MapThreatInfoElement
            element={threatInfoElement as InformationElementType}
            inGaze={inGaze}
          />
        </div>
      )}
    </div>
  );
};

export default MapWarningWidget;
