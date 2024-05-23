import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import TableElement from '../Element/Simple/TableElement';
import HistoryMessageElement from '../Element/Complex/HistoryMessageElement';
import { getListHistoryChannel } from 'src/redux/slices/componentSlice';
import { useAppSelector } from 'src/redux/hooks';
import { getMessages } from 'src/redux/slices/minimapSlice';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h } = widget;

  const { activeConversationId } = useAppSelector(getListHistoryChannel);
  const convoMessages = useAppSelector(getMessages).filter(
    (message) => message.conversationId === activeConversationId,
  );

  // const activeElementID = useAppSelector(getSelectedElementID);
  // const highlightIndex = convoMessages.findIndex(
  //   (message) => message.id === activeElementID,
  // );

  return (
    <div
      key={id}
      style={{ top: y, left: x, width: w, height: h }}
      className={`absolute text-white `}
    >
      <div className="grid grid-cols-12 items-start justify-start p-4 gap-4">
        {convoMessages.reverse().map((message, index) => {
          switch (message.kind) {
            case 'RequestApprovalToAttack':
              return (
                <HistoryMessageElement
                  index={convoMessages.length - index}
                  // isActive={highlightIndex === convoMessages.length - 1 - index}
                  isActive={false}
                  title={`ACA-${message.data.detectedByAca}`}
                  header="Request to attack"
                  desc={`Approval for ${message.data.attackWeapon.type} attack`}
                  tableContent={
                    <TableElement
                      element={{
                        id: `table:${activeConversationId}_${message}`,
                        modality: 'visual',
                        h: 3,
                        w: 4,

                        type: 'table',
                        tableData: [
                          ...Object.entries(message.data.target).map(
                            ([key, value]) => {
                              return [key, JSON.stringify(value)];
                            },
                          ),
                          ['col.damage', message.data.collateralDamage],
                        ],
                      }}
                    />
                  }
                />
              );

            case 'AcaDefect':
              return;

            case 'AcaFuelLow':
              return;

            case 'AcaHeadingToBase':
              return;

            case 'MissileToOwnshipDetected':
              return;
          }
        })}
      </div>
    </div>
  );
};

export default HistoryWidget;
