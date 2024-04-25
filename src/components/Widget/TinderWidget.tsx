import Element from 'src/components/Element/Element';
import type { Widget } from 'src/types/widget';

type TinderWidgetProps = {
  widget: Widget;
};

const TinderWidget = ({ widget }: TinderWidgetProps) => {
  const className =
    'absolute border-2 border-black p-2 flex flex-col gap-2 items-center';

  /** Tinder Widget "controls" the look of its Elements
   * It enforces a certain layout and style
   */
  const elementStyle = `w-full h-[50px] border-2 border-black`;

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
        <Element key={element.id} element={element} styleClass={elementStyle} />
      ))}
    </div>
  );
};

export default TinderWidget;
