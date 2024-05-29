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

  const warningIconInGaze = elementsInGaze.some(
    (element) => element.id === iconElement.id,
  );
  const threatInfoInGaze = elementsInGaze.some(
    (element) => element.id === threatInfoElement.id,
  );

  useEffect(() => {
    // show threat info element if icon element is in gaze
    if (warningIconInGaze && threatInfoElement.collapsed) {
      dispatch(
        updateElement(widget.id, { ...threatInfoElement, collapsed: false }),
      );
    }
  }, [warningIconInGaze, dispatch, threatInfoElement, widget.id]);

  useEffect(() => {
    if (warningIconInGaze && threatInfoElement.expirationIntervalMs) {
      // update expiration even if only icon element is in gaze
      // keep displaying threat info element while we hover over the icon
      dispatch(updateElementExpiration(widget.id, threatInfoElement.id));
    }
  }, [
    warningIconInGaze,
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
            inGaze={warningIconInGaze || threatInfoInGaze}
          />
        </>
      )}
    </div>
  );
};

export default MapWarningWidget;
