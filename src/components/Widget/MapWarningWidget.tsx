import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import Element from '../Element/Element';

type MapWarningWidgetProps = {
  widget: MapWarningWidgetType;
};

const MapWarningWidget = ({ widget }: MapWarningWidgetProps) => {
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
      <Element key={widget.id} element={widget.elements[0]}>
        {/* Nested children here if wanted */}
      </Element>
    </div>
  );
};

export default MapWarningWidget;
