import type { ReactNode, MouseEvent } from 'react';
import type { Element as ElementType } from 'src/types/element';
import TableElement from 'src/components/Element/Simple/TableElement';
import RequestApprovalElement from 'src/components/Element/Complex/RequestApprovalElement';
import ButtonElement from 'src/components/Element/Simple/ButtonElement';
import MissileIncomingElement from 'src/components/Element/Complex/MissileIncomingElement';
import ImageElement from 'src/components/Element/Simple/ImageElement';

type ElementProps = {
  element: ElementType;
  // for parent to possibly fine-tune the style of the Element
  styleClass?: string;
  // optional children for nested elements that Tom mentioned.
  children?: ReactNode;
  // and more props to perhaps control position of the children
};

const Element = ({ element, styleClass, children }: ElementProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // toggle collapse here...
  };

  const renderElement = () => {
    if (element.collapsed) {
      // return a common collpased look?
    }

    switch (element.type) {
      case 'request-approval':
        return <RequestApprovalElement element={element} />;

      case 'missile-incoming':
        return <MissileIncomingElement element={element} />;

      case 'table':
        return <TableElement element={element} />;

      case 'button':
        return <ButtonElement element={element} />;

      case 'text':
        return (
          <div>
            <span className="text-xl">{element.text}</span>
            <br></br>
            Priority: {element.priority!}
          </div>
        );
      case 'image':
        return <ImageElement element={element} />;
      case 'audio':
        return <div>Audio</div>;
      case 'icon':
        return element.src ? (
          <div id={element.id}>
            <img src={element.src} alt={element.type} />
          </div>
        ) : (
          <div>Icon</div>
        );
      case 'custom':
        return <div>Custom</div>;
      default:
        return <div>Unknown Element</div>;
    }
  };

  return (
    <div onClick={handleClick} className={styleClass}>
      {renderElement()}
      {children}
    </div>
  );
};

export default Element;
