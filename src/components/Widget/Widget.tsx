import type { Widget as WidgetType } from 'src/types/widget';
import TinderWidget from './TinderWidget';
import VehicleWidget from './VehicleWidget';
import { TextElement } from 'src/types/element';

type WidgetProps = {
  widget: WidgetType;
};

const Widget = ({ widget }: WidgetProps) => {
  const renderWidget = () => {
    switch (widget.type) {
      case 'vehicle':
        return <VehicleWidget widget={widget} />;
      case 'tinder':
        return <TinderWidget widget={widget} />;
      case 'highWarning':
        return <div style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
        ...widget.style,
        }}>
          <p style={{
            height: widget.elements[0].h,
            width: widget.elements[0].w,
            top: widget.elements[0].yWidget,
            left: widget.elements[0].xWidget,
            ...widget.elements[0].style,
          }}>{'text' in widget.elements[0] && widget.elements[0].text}</p>
        </div>;
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
