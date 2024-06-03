import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  updateCommunication,
  getCommunication,
  getSortMethod,
} from 'src/redux/slices/communicationSlice';
import { getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import type { Widget } from 'src/types/widget';
import type { Element } from 'src/types/element';
import ListElement from 'src/components/Element/Complex/ListElement';
import { getConversations } from 'src/redux/slices/conversationSlice';
import { getSortFunc } from 'src/scripts/sort/SortScripts';

type ListWidgetProps = {
  widget: Widget;
};

const LIST_ELEMENT_HEIGHT = 80;
const GAP_BETWEEN_ELEMENTS = 6;

const ListWidget = ({ widget }: ListWidgetProps) => {
  const conversations = useAppSelector(getConversations);

  const elementsInGaze = useAppSelector(getElementsInGaze);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const conversation = useAppSelector(getCommunication);

  const { activeConversationId } = conversation;

  const sortType = useAppSelector(getSortMethod);

  const [convoElements, setConvoElements] = useState<Element[]>([]);
  const [hoverElement, setHoverElement] = useState<Element>();
  const [selectedElement, setSelectedElement] = useState<Element>();

  const sortMethod = getSortFunc(sortType);

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
    newConvoElements.sort(sortMethod);
    setConvoElements(newConvoElements);
  }, [widget.elements, conversations, sortMethod]);

  // change selected element in list of arrow up or arrow down
  useEffect(() => {
    if (gazesAndKeys.some((gazeAndKey) => gazeAndKey.keyPress === 'KeyS')) {
      const currSelectedElemIndex =
        convoElements.findIndex((element) => element.id === hoverElement?.id) ||
        0;

      if (currSelectedElemIndex < convoElements.length - 1) {
        // setSelectedElement(convoElements[currSelectedElemIndex + 1]);
        setHoverElement(convoElements[currSelectedElemIndex + 1]);

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
        convoElements.findIndex((element) => element.id === hoverElement?.id) ||
        0;

      if (currSelectedElemIndex > 0) {
        // setSelectedElement(convoElements[currSelectedElemIndex - 1]);
        setHoverElement(convoElements[currSelectedElemIndex - 1]);

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
        hoverElement &&
        // @ts-ignore
        hoverElement.conversationId &&
        // @ts-ignore
        hoverElement.conversation !== activeConversationId
      ) {
        setSelectedElement(hoverElement);
        dispatch(
          updateCommunication({
            // @ts-ignore
            activeConversationId: hoverElement.conversationId,
            activeElementId: hoverElement.id,
            sortMethod: conversation.sortMethod,
          }),
        );
      }
    }
  }, [gazesAndKeys, hoverElement, activeConversationId, dispatch]);

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
        overflow: 'hidden',
      }}
    >
      {convoElements.map((element, index) => {
        // @ts-ignore
        const elemConvoId = element.conversationId;

        const elementStyle = () => {
          let style = '';
          if (element.id === elementInGazeId) {
            style = 'bg-[#444449] text-[28px] font-medium';
          }

          if (element.id === selectedElement?.id) {
            style = 'text-[28px] font-medium border-4 border-white rounded-xl p-0';
          } else if (element.id === hoverElement?.id) {
            style = 'text-[28px] font-medium border-4 border-[#A5A5A5] rounded-3xl';
          }
          return style;
        }

        const numUnreadMessages =
          conversations[elemConvoId]?.numUnreadMessages || 0;

        return (
          <div
            id={element.id}
            key={element.id}
            style={{ height: LIST_ELEMENT_HEIGHT, width: 340 }}
            className={`text-white flex items-center justify-center p-3 ${elementStyle()}`}
          >
            <ListElement
              element={element}
              outerDivStyleClass="w-full h-full px-4 rounded-full"
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
