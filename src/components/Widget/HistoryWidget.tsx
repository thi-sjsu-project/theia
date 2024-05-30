import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import HistoryElement from 'src/components/Element/Complex/HistoryElement';
import {
  getConversation,
  updateNumUnreadMessages,
} from 'src/redux/slices/conversationSlice';
import {
  getActiveConversationId,
  getCommunication,
} from 'src/redux/slices/communicationSlice';
import MessageNumber from 'src/ui/history/MessageNumber';
import { useEffect } from 'react';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h, elements } = widget;
  const activeConversationId = useAppSelector(getActiveConversationId);

  const dispatch = useAppDispatch();
  const conversation = useAppSelector((state) =>
    getConversation(state, activeConversationId),
  );
  const messages = conversation?.messages ? [...conversation.messages] : [];
  const numMessages = messages.length || 0;

  // useEffect(() => {
  //   console.log(activeConversationId);
  //   console.log(conversation);
  // }, [activeConversationId, conversation]);

  // const activeElementID = useAppSelector(getSelectedElementID);
  // const highlightIndex = convoMessages.findIndex(
  //   (message) => message.id === activeElementID,
  // );

  // don't show unread counter for newly arriving messages if conversation is open in history widget
  useEffect(() => {
    if (conversation?.numUnreadMessages > 0) {
      dispatch(updateNumUnreadMessages(conversation.id, 0));
    }
  }, [conversation?.numUnreadMessages, conversation?.id, dispatch]);

  const renderHistory = () => {
    if (numMessages) {
      return (
        <div className="grid grid-cols-12 items-start justify-start p-4 gap-4">
          {messages.reverse().map((message, index) => (
            <>
              <div key={message.id} className="col-span-1 flex flex-col h-full">
                <MessageNumber
                  number={numMessages - index}
                  glow={index === 0}
                />

                {/* line below the number */}
                {numMessages - index !== 1 && (
                  <div className="border-convo-bar h-full w-1/2 border-r-4 mt-4 flex flex-row items-center justify-center rounded-sm" />
                )}
              </div>

              <HistoryElement
                key={`${message.id}-${index}`}
                message={message}
                index={index + 1}
                outerDivStyleClass="col-span-11 bg-convo-bg rounded-lg p-2 h-fit
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
              />
            </>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full w-full text-xl">
        Select a conversation to view messages
      </div>
    );
  };

  return (
    <div
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
      }}
      className="absolute bg-[#323235] text-white"
    >
      {renderHistory()}
    </div>
  );
};

export default HistoryWidget;
