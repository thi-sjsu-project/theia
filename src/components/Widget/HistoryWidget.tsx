import { useAppSelector } from 'src/redux/hooks';
import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import HistoryElement from 'src/components/Element/Complex/HistoryElement';
import { getConversationMessages } from 'src/redux/slices/minimapSlice';
import { getCommunication } from 'src/redux/slices/communicationSlice';
import MessageNumber from 'src/ui/history/MessageNumber';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h, elements } = widget;
  const { activeConversationId } = useAppSelector(getCommunication);

  const convoMessages = useAppSelector((state) =>
    getConversationMessages(state, activeConversationId),
  );
  const numMessages = convoMessages.length;

  // const activeElementID = useAppSelector(getSelectedElementID);
  // const highlightIndex = convoMessages.findIndex(
  //   (message) => message.id === activeElementID,
  // );

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
      <div className="grid grid-cols-12 items-start justify-start p-4 gap-4">
        {convoMessages.reverse().map((message, index) => (
          <>
            <div key={message.id} className="col-span-1 flex flex-col h-full">
              <MessageNumber number={numMessages - index} glow />

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
    </div>
  );
};

export default HistoryWidget;
