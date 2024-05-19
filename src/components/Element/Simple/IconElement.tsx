import type { IconElement as IconElementType } from 'src/types/element';

type IconElementProps = {
  element: IconElementType;
};

const IconElement = ({ element }: IconElementProps) => {
  const { id, src, h, w, type } = element;

  if (!src) return null;

  return (
    <div id={id}>
      <img src={src} alt={type} width={w} height={h} />
    </div>
  );
};

export default IconElement;
