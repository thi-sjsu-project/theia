import { useEffect, type ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import ButtonElement from '../Simple/ButtonElement';
import IconElement from '../Simple/IconElement';
import { useAppSelector } from 'src/redux/hooks';
import { getMessage } from 'src/redux/slices/minimapSlice';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  children?: ReactNode;
};

const RequestApprovalElement = ({
  element,
  children,
}: RequestApprovalProps) => {
  const { id, collapsed, icon, rightButton, leftButton, messageId } = element;
  const message = useAppSelector((state) => getMessage(state, messageId));

  return (
    <div id={id} className="flex text-white items-center gap-4">
      <IconElement element={icon} />
      {/* @ts-ignore */}
      <span>{message?.data?.target?.type}</span>
    </div>
  );
};

export default RequestApprovalElement;
