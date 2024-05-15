import { type ImageElement as ImageElementType } from 'src/types/element';

type ImageElementProps = {
  element: ImageElementType;
};

const ImageElement = ({ element }: ImageElementProps) => {
  const { id, src, h, w, type } = element;

  if (!src) return null;

  return (
    <div id={id}>
      <img
        style={{
          // height: h,
          width: w,
        }}
        id={id}
        src={src}
        alt={type}
      />
    </div>
  );
};

export default ImageElement;
