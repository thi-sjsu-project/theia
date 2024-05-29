import { useEffect, useMemo, useState } from 'react';
import Element from 'src/components/Element/Element';
import { useAppDispatch } from 'src/redux/hooks';
import {
  setActiveConvoID,
  setSelectedElementID,
} from 'src/redux/slices/componentSlice';
import { type Element as ElementType } from 'src/types/element';
import type { Widget } from 'src/types/widget';

type ListWidgetProps = {
  widget: Widget;
};

type sort = (a: ElementType, b: ElementType) => number;

const sortFunctions: { [key: string]: sort } = {
  priority: (a, b) => a?.priority! - b?.priority!,
  time: (_a, _b) => -1,
  gaia: (a, b) => 1,
};

const ListWidget = ({ widget }: ListWidgetProps) => {
  const className =
    'absolute p-2 flex flex-col gap-6 items-center overflow-scroll overflow-x-hidden overflow-y-hidden';

  const elements = useMemo(() => [...widget.elements], [widget.elements]);

  const [selectedElement, setSelectedElement] = useState(0);
  const [sortMethod, setSortMethod] = useState<sort>(
    () => sortFunctions.priority,
  );
  const [sortedElements, setSortedElements] = useState<ElementType[]>(elements);

  useEffect(() => {
    setSortedElements([...elements].sort(sortMethod));
  }, [sortMethod, elements]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setActiveConvoID(
        sortedElements[selectedElement].message?.conversationId ?? '',
      ),
      dispatch(
        setSelectedElementID(sortedElements[selectedElement].message?.id),
      ),
    );
  }, [selectedElement]);

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
      {sortedElements.map((element, index) => {
        const style =
          selectedElement === index
            ? 'bg-[#444449] text-[28px] font-medium'
            : 'bg-[#323235] text-[24px]';
        return (
          // ListWidget enforces a certain layout and style for its Elements
          <div
            id={element.id}
            key={element.id}
            style={{ height: 80 }}
            className={`w-full text-white flex items-center justify-center rounded-xl p-3 ${style}`}
            onMouseEnter={() => setSelectedElement(index)} // temporary test
          >
            <Element element={element} styleClass="w-full h-full">
              {/* Nested children here if wanted.. */}
              Priority:{element.priority}
              Index:{elements.findIndex((el) => element)}
            </Element>
          </div>
        );
      })}
    </div>
  );
};

export default ListWidget;
