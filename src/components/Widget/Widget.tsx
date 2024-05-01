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
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
