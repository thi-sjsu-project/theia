import type { Widget as WidgetType } from 'src/types/widget';
import TinderWidget from './TinderWidget';
import VehicleWidget from './VehicleWidget';

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
      case 'message':
        return (
          <div
            className='absolute'
            style={{
              height: widget.h,
              width: widget.w,
              top: widget.y,
              left: widget.x,
              ...widget.style,
            }} 
          >
            <p
              style={{
                height: widget.elements[0].h,
                width: widget.elements[0].w,
                top: widget.elements[0].yWidget,
                left: widget.elements[0].xWidget,
                ...widget.elements[0].style,
              }}
            >
              {'text' in widget.elements[0] && widget.elements[0].text}
            </p>
          </div>
        );
      case 'highWarning':
        return (
          <div
            className="absolute"
            style={{
              height: widget.h,
              width: widget.w,
              top: widget.y,
              left: widget.x,
              ...widget.style,
            }}
          >
            <img src={'src' in widget.elements[0] ? widget.elements[0].src : undefined} alt={"missileToOwnship"} style={{
              height: widget.elements[0].h,
              width: widget.elements[0].w,
              top: widget.elements[0].yWidget,
              left: widget.elements[0].xWidget,
              ...widget.elements[0].style,
            }}/>
            <p
              style={{
                height: widget.elements[1].h,
                width: widget.elements[1].w,
                top: widget.elements[1].yWidget,
                left: widget.elements[1].xWidget,
                ...widget.elements[1].style,
              }}
            >
              {'text' in widget.elements[1] && widget.elements[1].text}
            </p>
          </div>
        );
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
