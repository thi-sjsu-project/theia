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
      className="absolute bg-[#1E1E1E] flex space-x-5 pl-4 h-12"
    >
      {elements.map((element) => (
        <div key={element.id} className="mx-2">
        <AcaStatusElement
          key={element.id}
          element={element as AcaStatusElementType}
        />
        </div>
      ))}
    </div>
  );
};

export default AcaHeaderWidget;
