import NOTCH from 'src/assets/icons/Ownship Notch.svg';
import type { EscalationModeWidget as EscalationModeWidgetType } from 'src/types/widget';
import type { EscalationModeElement as EscalationModeElementType } from 'src/types/element';
import EscalationModeElement from 'src/components/Element/Complex/EscalationModeElement';

type EscalationWidgetProps = {
    widget: EscalationModeWidgetType;
};

const EscalationWidget = ({ widget}: EscalationWidgetProps) => {
    const { x, y, h, w, elements } = widget;

    var firstElements = structuredClone(elements);

    return(
        <div
            style={{
                top: y,
                left: x,
                width: w,
                height: h,
                zIndex: '1000',
            }}
            className="absolute bg-[#252526] flex gap-4 py-2"
        >
            {firstElements.map((element) => (
                <EscalationModeElement
                    key={element.id}
                    element={element as EscalationModeElementType}
            />
                ))}
        </div>
    )
};

export default EscalationWidget;