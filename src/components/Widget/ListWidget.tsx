import { useEffect, useRef, useState } from 'react';
import Element from 'src/components/Element/Element';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateListHistoryChannel } from 'src/redux/slices/componentSlice';
import { getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import type { Widget } from 'src/types/widget';

type ListWidgetProps = {
  widget: Widget;
};

const ListWidget = ({ widget }: ListWidgetProps) => {
  const elementsInGaze = useAppSelector(getElementsInGaze);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);

  const [listOverflowed, setListOverflowed] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);

  // just pick the first element in the gaze for now
  // FIX: should be fixed when gaze calculates overlapping area and picks element with greater overlapping
  const elementInGazeId = elementsInGaze[0]?.id;

  // check if list is in gaze (if any of the elements in the list is in gaze)
  const listInGaze = widget.elements.some(
    (element) => element.id === elementInGazeId,
  );

  // scrolling the list
  useEffect(() => {
    // don't scroll if the list is not in gaze
    if (!listInGaze) return;

    // check if any key is 'S' or 'ArrowDown' and scroll down
    if (
      gazesAndKeys.some(
        (gazeAndKey) =>
          gazeAndKey.keyPress === 'KeyS' || gazeAndKey.keyPress === 'ArrowDown',
      )
    ) {
      console.log('scrolling down');
      listRef.current?.scrollBy(0, 100);
    }
    // check if any key is 'W' or 'ArrowUp' and scroll up
    else if (
      gazesAndKeys.some(
        (gazeAndKey) =>
          gazeAndKey.keyPress === 'KeyW' || gazeAndKey.keyPress === 'ArrowUp',
      )
    ) {
      console.log('scrolling up');
      listRef.current?.scrollBy(0, -100);
    }
  }, [listInGaze, gazesAndKeys]);

  // update the active conversation and element in the list-history channel
  useEffect(() => {
    widget.elements.forEach((element) => {
      if (element.id === elementInGazeId) {
        // @ts-ignore
        if (!element.message) {
          // FIX: all elements should have a message (at least the ones in the list)
          // at the minimu, they should have a conversationId attached to them?
          console.warn('Element does not have a message', element);
          return;
        }

        dispatch(
          updateListHistoryChannel({
            // @ts-ignore
            activeConversationId: element.message.conversationId,
            activeElementId: element.id,
          }),
        );
      }
    });
  }, [elementInGazeId, dispatch, widget.elements]);

  // check if the list is overflowed
  useEffect(() => {
    if (listRef.current) {
      if (
        listRef.current.offsetHeight < listRef.current.scrollHeight &&
        !listOverflowed
      ) {
        setListOverflowed(true);
      } else if (
        listRef.current.offsetHeight >= listRef.current.scrollHeight &&
        listOverflowed
      ) {
        setListOverflowed(false);
      }
    }
  }, [listOverflowed]);

  const className =
    'absolute p-2 flex flex-col gap-6 items-center overflow-scroll overflow-x-hidden overflow-y-hidden';

  // Sort elements by priority
  const sortedElementsByPriority = [...widget.elements].sort(
    (a, b) => a.priority! - b.priority!,
  );

  return (
    <div
      key={widget.id}
      id={widget.id}
      ref={listRef}
      className={className}
      style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
      }}
    >
      {sortedElementsByPriority.map((element) => {
        // style for the element which is current being hoverd over
        const hoverStyle =
          element.id === elementInGazeId
            ? 'bg-[#444449] text-[28px] font-medium'
            : 'bg-[#323235] text-[24px]';

        // style for active element (element due to which the history widget is open)
        const activeElementStyle = '';

        return (
          // ListWidget enforces a certain layout and style for its Elements
          <div
            id={element.id}
            key={element.id}
            style={{ height: 80 }}
            className={`w-full text-white flex items-center justify-center rounded-xl p-3 ${hoverStyle}`}
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
