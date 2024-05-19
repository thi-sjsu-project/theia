import Element from 'src/components/Element/Element';
import type { Widget } from 'src/types/widget';

type BasicWidgetProps = {
  widget: Widget;
};

const BasicWidget = ({ widget }: BasicWidgetProps) => {
  return (
    <div
      key={widget.id}
      id={widget.id}
      className="absolute"
      style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
      }}
    >
      {widget.elements.map((element) => (
        <Element element={element}>
          {/* Nested children here if wanted.. */}
        </Element>
      ))}
    </div>
  );
};

export default BasicWidget;
