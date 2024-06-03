import { useState, useEffect } from 'react';
import type { EscalationModeWidget as EscalationModeWidgetType } from 'src/types/widget';
import type { EscalationModeElement as EscalationModeElementType } from 'src/types/element';
import EscalationModeElement from 'src/components/Element/Complex/EscalationModeElement';
import { useAppDispatch } from 'src/redux/hooks';
import { fulfillMessage } from 'src/redux/slices/conversationSlice';

type EscalationWidgetProps = {
  widget: EscalationModeWidgetType;
};

const EscalationWidget = ({ widget }: EscalationWidgetProps) => {
  const { x, y, h, w, elements } = widget;
  const [escalationModeElement] = elements;

  const [initial, setInitial] = useState(true);
  const [animation, setAnimation] = useState<'approve' | 'deny' | undefined>(
    undefined,
  );
  const [animationClass, setAnimationClass] = useState(
    'animate-slide-in-right',
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setInitial(false), 10000); // remove slide-in after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (action: 'approve' | 'deny') => {
    // set message to fulfilled when approved or denied
    dispatch(
      fulfillMessage(
        (escalationModeElement as EscalationModeElementType).messageId,
      ),
    );
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
        gap: '0px',
      }}
      className={`absolute bg-[#252526] flex gap-4 py-2 ${animationClass}`}
    >
      <EscalationModeElement
        key={escalationModeElement.id}
        element={escalationModeElement as EscalationModeElementType}
        onAction={handleAction}
        animation={animation!}
        animationClass={animationClass}
        setAnimation={setAnimation}
        setAnimationClass={setAnimationClass}
      />
    </div>
  );
};

export default EscalationWidget;
