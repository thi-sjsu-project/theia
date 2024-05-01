import type { ButtonElement as ButtonElementType } from 'src/types/element';

type ButtonElementProps = {
  element: ButtonElementType;
};

const ButtonElement = ({ element }: ButtonElementProps) => {
  const { text, h, w } = element;

  return (
    <button
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
