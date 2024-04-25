import type { Element as ElementType } from 'src/types/element';

type ElementProps = {
  element: ElementType;
  styleClass?: string;
};

const Element = ({ element, styleClass }: ElementProps) => {
  const renderElement = () => {
    switch (element.type) {
      case 'table':
        return <div>Table</div>;
      case 'button':
        return <div>Button</div>;
      case 'text':
        return <div>{element.text}</div>;
      case 'image':
        return <div>Image</div>;
      case 'audio':
        return <div>Audio</div>;
      case 'icon':
        return element.src ? (
          <img src={element.src} alt={element.type} />
        ) : (
          <div>Icon</div>
        );
      default:
        return <div>Unknown Element</div>;
    }
  };

  return <div id={element.id}>{renderElement()}</div>;
};

export default Element;
