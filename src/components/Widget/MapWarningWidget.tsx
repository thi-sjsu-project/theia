import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import {
  addElementsToWidget,
  deleteElementFromWidget,
  updateElement,
  updateWidget,
} from 'src/redux/slices/minimapSlice';
import { useEffect, useState } from 'react';
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
  /** We have made widgets too generic, I think. Severely restricts our ability to design different widgets differently.
   * It would be very useful for different widgets types to specify in detail the number of elements they will have
   * as well as the type of each of those elements - Jagjit.
   */
  const [iconElement, threatInfoElement] = widget.elements;

  const elementsInGaze = useAppSelector(getElementsInGaze);
  const dispatch = useAppDispatch();

  const inGaze = elementsInGaze.some(
    (element) => element.id === iconElement.id,
  );

  // show threat info element if icon element is in gaze
  useEffect(() => {
    if (inGaze && threatInfoElement.collapsed) {
      dispatch(
        updateElement(widget.id, { ...threatInfoElement, collapsed: false }),
      );
    }
  }, [inGaze, dispatch, iconElement, threatInfoElement, widget]);

  const handleInGaze = () => {
    if (threatInfoElement) {
      return (
        <>
          <div style={{ height: 2, width: 75, border: '2px dashed white' }} />
          <MapThreatInfoElement
            element={threatInfoElement as InformationElementType}
            inGaze={inGaze}
          />
        </>
      );
    }

    return null;
  };

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
          />
        </>
      )}
    </div>
  );
};

export default MapWarningWidget;
