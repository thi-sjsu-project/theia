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
  }, [inGaze, dispatch, threatInfoElement, widget.id]);

  useEffect(() => {
    if (inGaze && threatInfoElement.expirationIntervalMs) {
      // update expiration even if only icon element is in gaze
      // keep displaying threat info element while we hover over the icon
      dispatch(updateElementExpiration(widget.id, threatInfoElement.id));
    }
  }, [
    inGaze,
    dispatch,
    threatInfoElement.id,
    threatInfoElement.expirationIntervalMs,
    widget.id,
  ]);

  return (
    <div
      key={widget.id}
      id={widget.id}
      className="absolute flex items-center justify-center"
      style={{
        top: ~~widget.y,
        left: ~~widget.x,
      }}
    >
      <IconElement element={iconElement as IconElementType} />
      {!threatInfoElement.collapsed && (
        <>
          {/* Connecting line */}
          <div style={{ height: 2, width: 75, border: '2px dashed white' }} />
          <MapThreatInfoElement
            element={threatInfoElement as InformationElementType}
            inGaze={inGaze}
          />
        </>
      )}
    </div>
  );
};

export default MapWarningWidget;
