import type { Element as ElementType } from 'src/types/element';

type ElementProps = {
  element: ElementType;
};

const ElementComponent = ({ element }: ElementProps) => {
  const className = `h-[${element.h}px] w-[${element.w}px]`;

  switch (element.type) {
    case 'icon':
      return (
        <div id={element.id} className={className}>
          <img src={element.src} alt={element.type} />
        </div>
      );
    default:
      return null;
  }
};

export default ElementComponent;
