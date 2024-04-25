import type { Widget as WidgetType } from 'src/types/widget';
import Element from 'src/components/Element/Element';

type WidgetProps = {
  widget: WidgetType;
};

const Widget = ({ widget }: WidgetProps) => {
  const className = `h-[${widget.h}px] w-[${widget.w}px]
  absolute`;

  return (
    <div
      key={widget.id}
      id={widget.id}
      className={className}
      style={{
        top: widget.y,
        left: widget.x,
      }}
    >
      {widget.elements.map((element) => (
        <Element key={element.id} element={element} />
      ))}
    </div>
  );
};

export default Widget;
