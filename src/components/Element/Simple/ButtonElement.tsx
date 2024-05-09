import type { ButtonElement as ButtonElementType } from 'src/types/element';

type ButtonElementProps = {
  element: ButtonElementType;
};

const ButtonElement = ({ element }: ButtonElementProps) => {
  const { text, h, w, id } = element;

  return (
    <button
      id={id}
      className="border-2 border-black"
      style={{
        height: h,
        width: w,
      }}
    >
      {text}
    </button>
  );
};

export default ButtonElement;
