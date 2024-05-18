import Element from 'src/components/Element/Element';
import type { VehicleWidget as VehicleWidgetType } from 'src/types/widget';

type VehicleWidgetProps = {
  widget: VehicleWidgetType;
};

const VehicleWidget = ({ widget }: VehicleWidgetProps) => {
  const className = 'absolute';

  const renderVehicleTag = () => {
    // @ts-ignore
    if (widget.elements[0].tag.includes('ACA')) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0.9,
            color: 'white',
            fontSize: 20,
            zIndex: 1,
          }}
        >
          {/* @ts-ignore */}
          {widget.elements[0].tag}
        </div>
      );
    }
  };

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          transform: `rotate(${-widget.rotation + Math.PI * 0.5}rad)`,
        }}
      >
        <Element key={widget.id} element={widget.elements[0]}>
          {/* Nested children here if wanted */}
        </Element>
      </div>

      {renderVehicleTag()}
    </div>
  );
};

export default VehicleWidget;
