import { type ReactNode } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getMessage } from 'src/redux/slices/conversationSlice';
import type { ThreatDetectedElement as ThreatDetectedElementType } from 'src/types/element';
import IconElement from '../Simple/IconElement';

type Props = {
  element: ThreatDetectedElementType;
  children?: ReactNode;
  unreadCount?: number;
};

const ThreatDetectedElement = ({ element, children, unreadCount }: Props) => {
  const { id, icon, messageId } = element;
  const message = useAppSelector((state) => getMessage(state, messageId));

  const getMessageText = () => {
    // console.log("I am being fired!")
    /*@ts-ignore*/
    if (message.kind === 'ThreatDetected') {
      return 'Threat Detected';
    }
    /*@ts-ignore*/
    // else if(message.kind == 'MissileToOwnshipDetected'){
    //   return 'Missile Incoming'
    // }
    return 'error';
  };

  const renderUnreadCount = () => {
    if (unreadCount && unreadCount > 0) {
      return (
        <div
          className="rounded-full bg-white w-[35px] h-[35px] text-[#252526] flex 
    items-center justify-center text-lg rounded-full"
        >
          {unreadCount}
        </div>
      );
    }
  };

  return (
    <div
      id={id}
      className="flex text-white justify-between items-center gap-4 pr-4 rounded-full"
    >
      <div className="flex flex-col">
        <div className="flex space-between items-center justify-center gap-4 rounded-full">
          <div className="flex">
            <IconElement element={icon} />
          </div>

          <div>
            {/* @ts-ignore */}
            <span className="text-[24px]">{message?.data?.target?.type}</span>
            <div className="flex flex-col text-sm text-[#BCBCBC] text-[20px] pb-2">
              <div>{getMessageText()}</div>
            </div>
          </div>
        </div>
      </div>

      {renderUnreadCount()}
    </div>
  );
};

export default ThreatDetectedElement;
