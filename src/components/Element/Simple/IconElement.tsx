import type { IconElement as IconElementType } from 'src/types/element';

type IconElementProps = {
  element: IconElementType;
};

const IconElement = ({ element }: IconElementProps) => {
  const { id, src, h, w, type } = element;

  if (!src) return null;

  return <img id={id} src={src} alt={type} />;
};

export default IconElement;
