import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import Element from 'src/components/Element/Element';
import { useAppSelector } from 'src/redux/hooks';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';

type MapWarningWidgetProps = {
  widget: MapWarningWidgetType;
};

const MapWarningWidget = ({ widget }: MapWarningWidgetProps) => {
  const elementsInGaze = useAppSelector(getElementsInGaze);

  const handleInGaze = () => {
    const warningElement = widget.elements[0];

    if (elementsInGaze.some((element) => element.id === warningElement.id)) {
      return (
        <>
          <div style={{ height: 2, width: 75, border: '2px dashed white' }} />
          <div
            style={{
              height: 60,
              width: 100,
              backgroundColor: 'turquoise',
              opacity: 0.8,
            }}
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
      <Element key={widget.id} element={widget.elements[0]}></Element>
      {handleInGaze()}
    </div>
  );
};

export default MapWarningWidget;
