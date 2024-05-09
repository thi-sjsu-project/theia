import Element from 'src/components/Element/Element';
import type { VehicleWidget as VehicleWidgetType } from 'src/types/widget';

type VehicleWidgetProps = {
  widget: VehicleWidgetType;
};

const VehicleWidget = ({ widget }: VehicleWidgetProps) => {
  const className = 'absolute';

  return (
    <div
      key={widget.id}
      id={widget.id}
      className={className}
      style={{
        height: ~~widget.h,
        width: ~~widget.w,
        top: widget.y,
        left: widget.x,
        transform: `rotate(${-widget.rotation + Math.PI * 0.5}rad)`,
      }}
    >
      <Element key={widget.id} element={widget.elements[0]}>
        {/* Nested children here if wanted */}
      </Element>
    </div>
  );
};

export default VehicleWidget;
