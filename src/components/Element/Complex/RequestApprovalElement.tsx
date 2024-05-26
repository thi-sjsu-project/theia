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

  return (
    <div id={id} className="flex text-white items-center gap-4">
      <IconElement element={icon} />
      {/* @ts-ignore */}
      <span>{message?.data?.target?.type}</span>

      {unreadCount && unreadCount > 0 && <span>{unreadCount}</span>}
    </div>
  );
};

export default RequestApprovalElement;
