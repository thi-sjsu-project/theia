import { useEffect, useState } from 'react';
import Element from 'src/components/Element/Element';
import useGaze from 'src/hooks/useGaze';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  setActiveConvoID,
  setSelectedElementID,
} from 'src/redux/slices/componentSlice';
import { getElementsInGaze } from 'src/redux/slices/gazeSlice';
import type { Widget } from 'src/types/widget';

type ListWidgetProps = {
  widget: Widget;
};

const ListWidget = ({ widget }: ListWidgetProps) => {
  const elementsInGaze = useAppSelector(getElementsInGaze);

  // just pick the first element in the gaze for now
  const elementInGazeId = elementsInGaze[0]?.id;

  // useEffect(() => {
  //   console.log('elementsInGaze: ', elementsInGaze);
  // }, [elementsInGaze]);

  const className =
    'absolute p-2 flex flex-col gap-6 items-center overflow-scroll overflow-x-hidden overflow-y-hidden';

  // Sort elements by priority
  const sortedElementsByPriority = [...widget.elements].sort(
    (a, b) => a.priority! - b.priority!,
  );

  const [selectedElement, setSelectedElement] = useState(0);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(
  //     setActiveConvoID(
  //       sortedElementsByPriority[selectedElement].message?.conversationId ?? '',
  //     ),
  //     dispatch(
  //       setSelectedElementID(
  //         sortedElementsByPriority[selectedElement].message?.id,
  //       ),
  //     ),
  //   );
  // }, [selectedElement]);

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
      {sortedElementsByPriority.map((element) => {
        const style =
          element.id === elementInGazeId
            ? 'bg-[#444449] text-[28px] font-medium'
            : 'bg-[#323235] text-[24px]';

        return (
          // ListWidget enforces a certain layout and style for its Elements
          <div
            id={element.id}
            key={element.id}
            style={{ height: 80 }}
            className={`w-full text-white flex items-center justify-center rounded-xl p-3 ${style}`}
          >
            <Element element={element} styleClass="w-full h-full">
              {/* Nested children here if wanted.. */}
            </Element>
          </div>
        );
      })}
    </div>
  );
};

export default ListWidget;
