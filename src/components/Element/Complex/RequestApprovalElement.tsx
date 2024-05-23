import type { ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import ButtonElement from '../Simple/ButtonElement';
import IconElement from '../Simple/IconElement';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  children?: ReactNode;
};

const RequestApprovalElement = ({
  element,
  children,
}: RequestApprovalProps) => {
  const {
    id,
    collapsed,
    icon,
    rightButton,
    leftButton,
    message: {
      priority,
      data: {
        target,
        detectedByAca,
        choiceWeight,
        attackWeapon,
        collateralDamage,
      },
    },
  } = element;

  return (
    <div id={id} className="flex text-white items-center gap-4">
      <IconElement element={icon} />
      <span>{target.type}</span>
    </div>
  );
};

export default RequestApprovalElement;
