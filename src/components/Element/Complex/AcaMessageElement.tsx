import type { AcaMessageElement as AcaMessageElementType } from 'src/types/element';

type AcaMessageElementProps = {
  element: AcaMessageElementType;
};

const AcaMessageElement = ({ element }: AcaMessageElementProps) => {
  const { id, w, h, text } = element;

  return (
    <div
      id={id}
      className="bg-[#282828] bg-opacity-90 rounded-lg shadow-md text-[#f5f5f5] flex items-center justify-center font-medium"
      style={{ width: w, height: h, fontSize: 24 }}
    >
      <div
        className="absolute"
        style={{
          animation: '5s linear 1 new-notification',
          background:
            'radial-gradient(73.67% 100% at 50% 0%, #19DEBB 0%, rgba(50, 50, 50, 0.10) 100%)',
          width: w,
          height: h,
          opacity: 0,
        }}
      ></div>
      <div className="absolute -mt-px">{text}</div>
    </div>
  );
};

export default AcaMessageElement;
