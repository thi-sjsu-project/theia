import type { Element as ElementType } from 'src/types/element';

type ElementProps = {
  element: ElementType;
};

const Element = ({ element }: ElementProps) => {
  const className = `h-[${element.h}px] w-[${element.w}px]`;

  const renderElement = () => {
    switch (element.type) {
      case 'table':
        return <div>Table</div>;
      case 'button':
        return <div>Button</div>;
      case 'text':
        return <div>Text</div>;
      case 'image':
        return <div>Image</div>;
      case 'audio':
        return <div>Audio</div>;
      case 'icon':
        return <img src={element.src} alt={element.type} />;
      default:
        return <div>Unknown Element</div>;
    }
  };

  return (
    <div id={element.id} className={className}>
      {renderElement()}
    </div>
  );
};

export default Element;
