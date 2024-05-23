import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import TableElement from '../Element/Simple/TableElement';
import HistoryMessageElement from '../Element/Complex/HistoryMessageElement';
import { getChannel } from 'src/redux/slices/channelSlice';
import { useAppSelector } from 'src/redux/hooks';
import { getConversationMessages } from 'src/redux/slices/minimapSlice';
import type { ListHistoryChannel } from 'src/types/channel';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h } = widget;

  const listHistoryChannel = useAppSelector((state) =>
    getChannel(state, 'list-history'),
  );
  const { data: { activeConversationId = '' } = {} } =
    (listHistoryChannel as ListHistoryChannel) || {};

  const convoMessages = useAppSelector((state) =>
    getConversationMessages(state, activeConversationId),
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
                  key={message.id}
                  index={convoMessages.length - index}
                  // isActive={highlightIndex === convoMessages.length - 1 - index}
                  isActive={true}
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
              return null;

            case 'AcaFuelLow':
              return null;

            case 'AcaHeadingToBase':
              return null;

            case 'MissileToOwnshipDetected':
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default HistoryWidget;
