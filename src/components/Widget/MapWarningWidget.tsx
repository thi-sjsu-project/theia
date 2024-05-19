import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import {
  addElementsToWidget,
  deleteElementFromWidget,
} from 'src/redux/slices/minimapSlice';
import { useEffect, useState } from 'react';
import type {
  IconElement as IconElementType,
  TextElement as TextElementType,
  InformationElement as InformationElementType,
} from 'src/types/element';
import IconElement from 'src/components/Element/Simple/IconElement';
import MapThreatInfoElement from '../Element/Complex/MapThreatInfoElement';

type MapWarningWidgetProps = {
  widget: MapWarningWidgetType;
};

const MapWarningWidget = ({ widget }: MapWarningWidgetProps) => {
  /** We have made widgets too generic, I think. Severely restricts our ability to design different widgets differently. */
  const [iconElement, threatInfoElement] = widget.elements;

  const elementsInGaze = useAppSelector(getElementsInGaze);
  const dispatch = useAppDispatch();

  const inGaze = elementsInGaze.some(
    (element) => element.id === iconElement.id,
  );

  useEffect(() => {
    if (inGaze && !threatInfoElement) {
      console.log('adding threat info element');
      dispatch(
        addElementsToWidget(widget.id, [
          {
            id: uuid(),
            type: 'information',
            modality: 'visual',
            h: 60,
            w: 100,
            messages: [],
            widgetId: widget.id,
            size: 'M',
            title: 'Threat Information',
            onExpiration: 'delete',
            // 3 seconds into the future
            expiration: new Date(Date.now() + 3000).toISOString(),
            expirationInterval: 3000,
          } satisfies InformationElementType,
        ]),
      );
    }
  }, [inGaze, dispatch, widget.id, threatInfoElement]);

  const handleInGaze = () => {
    if (threatInfoElement) {
      return (
        <>
          <div style={{ height: 2, width: 75, border: '2px dashed white' }} />
          <MapThreatInfoElement
            element={threatInfoElement as InformationElementType}
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
      {handleInGaze()}
    </div>
  );
};

export default MapWarningWidget;
