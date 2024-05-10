import Element from 'src/components/Element/Element';
import type { Widget } from 'src/types/widget';

type ListWidgetProps = {
  widget: Widget;
};

const ListWidget = ({ widget }: ListWidgetProps) => {
  const className =
    'absolute border-2 border-black p-2 flex flex-col gap-2 items-center overflow-scroll';

  // Sort elements by priority
  const sortedElementsByPriority = [...widget.elements].sort(
    (a, b) => a.priority! - b.priority!,
  );

  return (
    <div
      key={widget.id}
      id={widget.id}
      className={className}
      style={{
        height: widget.h,
        width: widget.w,
        // top: widget.y,
        // left: widget.x,
        // Hardcoded for now (for demo purposes)
        top: 150,
        left: 1550,
      }}
    >
      {sortedElementsByPriority.map((element) => (
        // ListWidget enforces a certain layout and style for its Elements
        <div
          id={element.id}
          key={element.id}
          className="w-full min-h-[100px] border-2 border-black 
          flex items-center justify-center"
        >
          <Element element={element}>
            {/* Nested children here if wanted.. */}
          </Element>
        </div>
      ))}
    </div>
  );
};

export default ListWidget;
