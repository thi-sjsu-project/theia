import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  updateCommunication,
  getCommunication,
} from 'src/redux/slices/communicationSlice';
import { getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import type { Widget } from 'src/types/widget';
import type { Element } from 'src/types/element';
import ListElement from 'src/components/Element/Complex/ListElement';
import {
  getConversations,
  updateNumUnreadMessages,
} from 'src/redux/slices/conversationSlice';
import { getAllElements } from 'src/redux/slices/minimapSlice';


type ListWidgetProps = {
  widget: Widget;
};

const LIST_ELEMENT_HEIGHT = 80;
const GAP_BETWEEN_ELEMENTS = 6;

const ListWidget = ({ widget }: ListWidgetProps) => {
  const conversations = useAppSelector(getConversations);

  const allElements = useAppSelector(getAllElements);

  const elementsInGaze = useAppSelector(getElementsInGaze);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const { activeElementId, activeConversationId } =
    useAppSelector(getCommunication);

  const [convoElements, setConvoElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element>();

  // const listCapacity = Math.floor(
  //   widget.h / (LIST_ELEMENT_HEIGHT + GAP_BETWEEN_ELEMENTS) - 1,
  // );
  // TODO: use this to control the UI to show if the list is overflowed or not
  // const [listOverflowed, setListOverflowed] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);

  // just pick the first element in the gaze for now
  // FIX: should be fixed when gaze calculates overlapping area and picks element with greater overlapping
  const elementInGazeId = elementsInGaze[0]?.id;

  // check if list is in gaze (if any of the elements in the list is in gaze)
  const listInGaze = widget.elements.some(
    (element) => element.id === elementInGazeId,
  );

  // separate out a list of conversations
  useEffect(() => {
    const newConvoElements: Element[] = [];

    widget.elements.forEach((element) => {
      // @ts-ignore
      const messageId = element.messageId;
      // @ts-ignore
      const convoId = element.conversationId;
      // @ts-ignore
      if (
        messageId &&
        convoId &&
        conversations[convoId] &&
        conversations[convoId].latestMessageId !== messageId
      ) {
        return;
      }

      newConvoElements.push(element);
    });

    // Sort elements by priority
    newConvoElements.sort((a, b) => a.priority! - b.priority!);
    setConvoElements(newConvoElements);
  }, [widget.elements, conversations]);



//   useEffect(() => {
//   for(let gk of gazesAndKeys){
//     if(gk.keyPress === "1"){
//       for(let element of allElements){
//           if(element === undefined || gk.elemsInGaze[0] === undefined){
//               break;
//           }
//           if(element.id == gk.elemsInGaze[0].id && element.type == 'information'){
//           console.log(element);
//           dispatch(updateCommunication({
//             //@ts-ignore 
//             activeConversationId: element.conversationId,
//             activeElementId: element.id
//           }));
//           }
//       }
//     }
//   }
// }, [gazesAndKeys]);
  
  useEffect(() => {
// change selected element in list of arrow up or arrow down
    if (gazesAndKeys.some((gazeAndKey) => gazeAndKey.keyPress === 'KeyS')) {
      const currSelectedElemIndex =
        convoElements.findIndex(
          (element) => element.id === selectedElement?.id,
        ) || 0;

      if (currSelectedElemIndex < convoElements.length - 1) {
        setSelectedElement(convoElements[currSelectedElemIndex + 1]);

        // scroll down here if needed?
        const domElem = document.getElementById(
          convoElements[currSelectedElemIndex - 1]?.id,
        );
        if (!domElem) return;

        const rect = domElem?.getBoundingClientRect();
        const { top, bottom } = rect;

        if (bottom > widget.h) {
          listRef.current?.scrollBy(0, 100);
        }
      }
    } else if (
      gazesAndKeys.some((gazeAndKey) => gazeAndKey.keyPress === 'KeyW')
    ) {
      const currSelectedElemIndex =
        convoElements.findIndex(
          (element) => element.id === selectedElement?.id,
        ) || 0;

      if (currSelectedElemIndex > 0) {
        setSelectedElement(convoElements[currSelectedElemIndex - 1]);

        const domElem = document.getElementById(
          convoElements[currSelectedElemIndex - 1]?.id,
        );
        if (!domElem) return;

        const rect = domElem?.getBoundingClientRect();
        const { top, bottom } = rect;

        if (top < widget.y) {
          listRef.current?.scrollBy(0, -100);
        }
      }
    }
  }, [gazesAndKeys, convoElements, widget.y, widget.h]);

  useEffect(() => {
    if (gazesAndKeys.some((gazeAndKey) => gazeAndKey.keyPress === 'KeyQ')) {
      if (
        selectedElement &&
        // @ts-ignore
        selectedElement.conversationId &&
        // @ts-ignore
        selectedElement.conversation !== activeConversationId
      ) {
        dispatch(
          updateCommunication({
            // @ts-ignore
            activeConversationId: selectedElement.conversationId,
            activeElementId: selectedElement.id,
          }),
        );
      }
    }
  }, [gazesAndKeys, selectedElement, activeConversationId, dispatch]);

  // scrolling the list
  // useEffect(() => {
  //   // don't scroll if the list is not in gaze
  //   if (!listInGaze) return;

  //   // check if any key is 'S' or 'ArrowDown' and scroll down
  //   if (
  //     gazesAndKeys.some(
  //       (gazeAndKey) =>
  //         gazeAndKey.keyPress === 'KeyS' || gazeAndKey.keyPress === 'ArrowDown',
  //     )
  //   ) {
  //     listRef.current?.scrollBy(0, 100);
  //   }
  //   // check if any key is 'W' or 'ArrowUp' and scroll up
  //   else if (
  //     gazesAndKeys.some(
  //       (gazeAndKey) =>
  //         gazeAndKey.keyPress === 'KeyW' || gazeAndKey.keyPress === 'ArrowUp',
  //     )
  //   ) {
  //     listRef.current?.scrollBy(0, -100);
  //   }
  // }, [listInGaze, gazesAndKeys]);

  // update the active conversation and element in the list-history channel on mouse left-click
  // useEffect(() => {
  //   const mouseLeftClick = gazesAndKeys.find(
  //     (gazeAndKey) => gazeAndKey.keyPress === '0',
  //   );

  //   if (!mouseLeftClick || !mouseLeftClick.elemsInGaze.length) return;

  //   widget.elements.forEach((element) => {
  //     // just pick the first element in the gaze for now
  //     if (element.id === mouseLeftClick.elemsInGaze[0].id) {
  //       // @ts-ignore
  //       if (!element.messageId || !element.conversationId) {
  //         // FIX: all elements should have a message (at least the ones in the list)
  //         // at the minimu, they should have a conversationId attached to them?
  //         console.warn('Element does not have a message', element);
  //         return;
  //       }

  //       dispatch(
  //         updateCommunication({
  //           // @ts-ignore
  //           activeConversationId: element.conversationId,
  //           activeElementId: element.id,
  //         }),
  //       );

  //       // when we open a conversation, set number of unread messages to 0
  //       // @ts-ignore
  //       dispatch(updateNumUnreadMessages(element.conversationId, 0));
  //     }
  //   });
  // }, [gazesAndKeys, dispatch, elementInGazeId, widget.elements]);

  // check if the list is overflowed
  // useEffect(() => {
  //   if (widget.elements.length > listCapacity && !listOverflowed) {
  //     setListOverflowed(true);
  //   } else if (widget.elements.length <= listCapacity && listOverflowed) {
  //     setListOverflowed(false);
  //   }
  // }, [listOverflowed, listCapacity, widget.elements.length]);

  // check if the list is overflowed (alternative to the above method)
  //  useEffect(() => {
  //   if (listRef.current) {
  //     if (
  //       listRef.current.offsetHeight < listRef.current.scrollHeight &&
  //       !listOverflowed
  //     ) {
  //       setListOverflowed(true);
  //     } else if (
  //       listRef.current.offsetHeight >= listRef.current.scrollHeight &&
  //       listOverflowed
  //     ) {
  //       setListOverflowed(false);
  //     }
  //   }
  // }, [listOverflowed]);

  const className = `absolute p-2 flex flex-col gap-6 items-center overflow-x-hidden overflow-y-auto`;

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
        scrollbarWidth: 'thin',
        scrollbarColor: '#97979D #e0e0e0',
        scrollbarGutter: 'stable',
      }}
    >
      {convoElements.map((element, index) => {
        // @ts-ignore
        const elemConvoId = element.conversationId;

        // style for the element which is current being hoverd over
        const hoverStyle =
          element.id === elementInGazeId
            ? 'bg-[#444449] text-[28px] font-medium'
            : 'bg-[#323235] text-[24px]';

        // style for active element (element due to which the history widget is open)
        const activeElementStyle =
          element.id === selectedElement?.id
            ? 'bg-[#444449] text-[28px] font-medium border-4 border-white'
            : '';

        const numUnreadMessages =
          conversations[elemConvoId]?.numUnreadMessages || 0;

        return (
          <div
            id={element.id}
            key={element.id}
            style={{ height: LIST_ELEMENT_HEIGHT }}
            className={`w-full text-white flex items-center justify-center rounded-xl p-3 ${hoverStyle} ${activeElementStyle}`}
          >
            <ListElement
              element={element}
              outerDivStyleClass="w-full h-full"
              unreadCount={numUnreadMessages}
            >
              {/* Nested children here if wanted.. */}
            </ListElement>
          </div>
        );
      })}
    </div>
  );
};

export default ListWidget;
