import { useEffect, type ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import IconElement from '../Simple/IconElement';
import { useAppSelector } from 'src/redux/hooks';
import { getMessage } from 'src/redux/slices/conversationSlice';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  children?: ReactNode;
  unreadCount?: number;
};

const RequestApprovalElement = ({
  element,
  children,
  unreadCount,
}: RequestApprovalProps) => {
  const { id, icon, messageId } = element;
  const message = useAppSelector((state) => getMessage(state, messageId));

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
};

export default RequestApprovalElement;
