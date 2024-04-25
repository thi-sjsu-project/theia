import Element from 'src/components/Element/Element';
import type { Widget } from 'src/types/widget';

type TinderWidgetProps = {
  widget: Widget;
};

const TinderWidget = ({ widget }: TinderWidgetProps) => {
  const className =
    'absolute border-2 border-black p-2 flex flex-col gap-2 items-center';

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
      {widget.elements.map((element) => (
        // TinderWidget enforces a certain layout and style for its Elements
        <div className="w-full min-h-[50px] border-2 border-black">
          <Element key={element.id} element={element} />
        </div>
      ))}
    </div>
  );
};

export default TinderWidget;
