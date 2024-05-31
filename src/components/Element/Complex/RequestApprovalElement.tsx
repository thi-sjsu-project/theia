import { type ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import IconElement from '../Simple/IconElement';
import TableElement from '../Simple/TableElement';
import {
  getWidgetById,
} from 'src/redux/slices/minimapSlice';
import { useAppSelector } from 'src/redux/hooks';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';
import { getMessage, getConversationOfMessage, getConversation } from 'src/redux/slices/conversationSlice';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  inGaze?: boolean;
  children?: ReactNode;
  unreadCount?: number;
};

const RequestApprovalElement = ({
  element,
  inGaze,
  children,
  unreadCount,
}: RequestApprovalProps) => {
  const { id, icon, messageId, conversationId } = element;
  const message = useAppSelector((state) => getMessage(state, messageId));

  // Getting widget to know the screen that the element is on
  const widget = useAppSelector((state) =>
    getWidgetById(state, element.widgetId!),
  );

  const conversation: any = useAppSelector((state) =>
    getConversation(state, conversationId),
  )

  const requests = conversation.messages

  // Transform threat level from a float number in a range of 0-1 to a string of low, medium, high
  const threatLevelString = (threatLevel: number) => {
    const threatLevelInteger = Math.floor(threatLevel * 3);
    return ['low', 'medium', 'high'][threatLevelInteger];
  };

  const transformAttackType = (attackType: string) => {
    for (let index = 0; index < attackType.length; index++) {
      const character = attackType[index];
      if (character === character.toUpperCase()) {
        const splitAttack = attackType.split(character);
        const newAttackType = splitAttack[0] + ' ' + character + splitAttack[1];
        return newAttackType.toLowerCase();
      }
    }
  };

  const renderMiniMapRequestApprovalElement = () => {
    const mainRequest = requests[0];

    return (
      <div
        className={
          inGaze
            ? 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl border-turquoise border-x-[5px] '
            : 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl'
        }
      >
        <div className="font-medium text-4xl mb-[5px]">
          {cfl(mainRequest.data.target.type)}
        </div>
        <div className="grid grid-cols-[40px_1fr]">
          <div className="grid grid-rows-[40px_1fr]">
            <div className="flex-auto bg-turquoise text-black text-2xl text-center h-fit font-semibold rounded-l-md">
              {requests.length}
            </div>
            {requests.length > 1 ? (
              <svg width="40px" height="100%">
                <line
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="230"
                  stroke="#656566"
                  stroke-width="4"
                  stroke-dasharray="180,10,1,10,1,10,1"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg width="40px" height="100%">
                <line
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="230"
                  stroke="#656566"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </div>

          <div className="bg-convo-bg h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1">
              <div className="flex flex-col">
                <div className="font-medium text-[28px]">
                  ACA-{mainRequest.data.detectedByAca}: Request to attack
                </div>
                <div className="font-2xl">
                  {transformAttackType(mainRequest.data.attackWeapon.type)}
                </div>
              </div>

              <div className="col-span-4 text-left">
                <TableElement
                  element={{
                    id: 'convoID_<el.index>',
                    modality: 'visual',
                    h: 3,
                    w: 4,

                    type: 'table',
                    rows: 4,
                    cols: 2,
                    tableData: [
                      [
                        'location',
                        mainRequest.data.target.location.x +
                          ', ' +
                          mainRequest.data.target.location.y,
                      ],
                      ['priority', mainRequest.priority.toString()],
                      [
                        'threat-level',
                        threatLevelString(mainRequest.data.target.threatLevel),
                      ],
                      ['col.damage', mainRequest.data.collateralDamage],
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (widget!.screen === '/pearce-screen') {
    const renderUnreadCount = () => {
      if (unreadCount && unreadCount > 0) {
        return (
          <div
            className="rounded-full bg-white w-[35px] h-[35px] text-[#252526] flex 
    items-center justify-center text-lg"
          >
            {unreadCount}
          </div>
        );
      }
    };

    return (
      <div
        id={id}
        className="flex text-white justify-between items-center gap-4 pr-4"
      >
        <div className="flex space-between items-center justify-center gap-4">
          <IconElement element={icon} />
          {/* @ts-ignore */}
          <span>{message?.data?.target?.type}</span>
        </div>

        {renderUnreadCount()}
      </div>
    );
  } else if (widget!.screen === '/minimap') {
    return renderMiniMapRequestApprovalElement();
  }
};

export default RequestApprovalElement;
