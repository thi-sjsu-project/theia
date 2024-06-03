import { useState, useEffect } from 'react';
import type { EscalationModeWidget as EscalationModeWidgetType } from 'src/types/widget';
import type { EscalationModeElement as EscalationModeElementType } from 'src/types/element';
import EscalationModeElement from 'src/components/Element/Complex/EscalationModeElement';

type EscalationWidgetProps = {
  widget: EscalationModeWidgetType;
};

const EscalationWidget = ({ widget }: EscalationWidgetProps) => {
  const { x, y, h, w, elements } = widget;
  const [initial, setInitial] = useState(true);
  const [animation, setAnimation] = useState<'approve' | 'deny' | undefined>(undefined,);
  const [animationClass, setAnimationClass] = useState('animate-slide-in-right');

  useEffect(() => {
    const timer = setTimeout(() => setInitial(false), 10000); // remove slide-in after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (action: 'approve' | 'deny') => {
    // Logic to handle approve/deny action
  };

  return (
    <div
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
        zIndex: '1000',
        visibility: 'hidden',
        flexDirection: 'row', 
        gap: '0px'
      }}
      className={`absolute bg-[#252526] flex gap-4 py-2 ${animationClass}`}
    >
      {elements.map((element) => (
        <EscalationModeElement
          key={element.id}
          element={element as EscalationModeElementType}
          onAction={handleAction}
          animation={animation!}
          animationClass={animationClass}
          setAnimation={setAnimation}
          setAnimationClass={setAnimationClass}
        />
      ))}
    </div>
  );
};

export default EscalationWidget;
