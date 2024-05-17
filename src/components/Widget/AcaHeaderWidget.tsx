import type { AcaHeaderWidget as AcaHeaderWidgetType } from 'src/types/widget';
import type { AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import AcaStatusElement from 'src/components/Element/Complex/AcaStatusElement';

type AcaHeaderWidgetProps = {
  widget: AcaHeaderWidgetType;
};

const AcaHeaderWidget = ({ widget }: AcaHeaderWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  return (
    <div
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
      }}
      className="absolute bg-[#2D2D30] flex"
    >
      {elements.map((element) => (
        <AcaStatusElement
          key={element.id}
          element={element as AcaStatusElementType}
        />
      ))}
    </div>
  );
};

export default AcaHeaderWidget;
