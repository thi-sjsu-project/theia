import type { AcaHeaderWidget as AcaHeaderWidgetType } from 'src/types/widget';
import type { AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import AcaStatusElement from 'src/components/Element/Complex/AcaStatusElement';

type AcaHeaderWidgetProps = {
  widget: AcaHeaderWidgetType;
};

const AcaHeaderWidget = ({ widget }: AcaHeaderWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  var firstElements = structuredClone(elements);
  const lastElements = firstElements.splice(4);

  return (
    <div
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
      }}
      className="absolute bg-[#252526] flex gap-4 px-4 py-2"
    >
      {firstElements.map((element) => (
        <AcaStatusElement
          key={element.id}
          element={element as AcaStatusElementType}
        />
      ))}
      <div className="grow" />
      {lastElements.map((element) => (
        <AcaStatusElement
          key={element.id}
          element={element as AcaStatusElementType}
        />
      ))}
    </div>
  );
};

export default AcaHeaderWidget;
