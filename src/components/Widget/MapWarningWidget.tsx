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
  RequestApprovalElement as RequestApprovalElementType,
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
  const [iconElement, threatInfoElement, requestApprovalElement] = widget.elements;

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
            <div
              style={{ height: 2, width: 75, border: '2px dashed white' }}
              className="inline-block align-[2.375rem]"
            />
          )}
        </div>
      </div>
      {!threatInfoElement.collapsed && (
        <div className="inline-block align-top mt-2">
          <MapThreatInfoElement
            elements={[
              threatInfoElement as InformationElementType,
              requestApprovalElement as RequestApprovalElementType,
            ]}
            inGaze={warningIconInGaze || threatInfoInGaze}
          />
        </div>
      )}
    </div>
  );
};

export default MapWarningWidget;
