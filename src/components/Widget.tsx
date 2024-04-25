import type { ReactNode } from 'react';
import type { Widget as WidgetType } from 'src/types/widget';

type WidgetProps = {
  widget: WidgetType;
  children: ReactNode;
};

const Widget = ({ widget, children }: WidgetProps) => {
  const className = `h-[${widget.h}px] w-[${widget.w}px]
  absolute`;
  const style = widget.style;

  return (
    <div
      key={widget.id}
      id={widget.id}
      className={className}
      style={{
        top: widget.y,
        left: widget.x,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Widget;
