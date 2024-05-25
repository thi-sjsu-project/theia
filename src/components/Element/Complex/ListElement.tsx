import { type ReactNode } from 'react';
import type { Element } from 'src/types/element';
import RequestApprovalElement from './RequestApprovalElement';
import MissileIncomingElement from './MissileIncomingElement';

type ListElementProps = {
  element: Element;
  outerDivStyleClass: string;
  children?: ReactNode;
};

const ListElement = ({
  element,
  outerDivStyleClass,
  children,
}: ListElementProps) => {
  const renderElement = () => {
    switch (element.type) {
      case 'request-approval':
        return <RequestApprovalElement element={element} />;
      case 'missile-incoming':
        return <MissileIncomingElement element={element} />;
      default:
        return <div>{element.type}</div>;
    }
  };

  return (
    <div className={outerDivStyleClass}>
      {renderElement()}
      {children}
    </div>
  );
};

export default ListElement;
