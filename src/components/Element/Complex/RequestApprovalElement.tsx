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

  // if (collapsed) {
  //   return (
  //     <div className="flex gap-2 items-center">
  //       <IconElement element={icon} />
  //       <span>Request Approval to Attack</span>
  //     </div>
  //   );
  // }

  return (
    <div>
      <p>Request Approval to Attack</p>
      <p>Target: {target.type}</p>

      {/* More information here */}

      <div className="flex gap-2">
        <ButtonElement element={leftButton} />
        <ButtonElement element={rightButton} />
      </div>
    </div>
  );
};

export default RequestApprovalElement;
