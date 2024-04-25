import Element from 'src/components/Element/Element';
import type { Widget } from 'src/types/widget';

// widget.type must be 'vehicle'
type VehicleWidgetProps = {
  widget: Widget;
};

const VehicleWidget = ({ widget }: VehicleWidgetProps) => {
  const className = 'absolute';

  return (
    <div
      key={widget.id}
      id={widget.id}
      className={className}
      style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
      }}
    >
      <Element key={widget.id} element={widget.elements[0]} />
    </div>
  );
};

export default VehicleWidget;
