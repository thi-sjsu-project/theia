import type { Widget as WidgetType } from 'src/types/widget';
import ListWidget from 'src/components/Widget/ListWidget';
import VehicleWidget from 'src/components/Widget/VehicleWidget';

type WidgetProps = {
  widget: WidgetType;
};

const Widget = ({ widget }: WidgetProps) => {
  const renderWidget = () => {
    switch (widget.type) {
      case 'vehicle':
        return <VehicleWidget widget={widget} />;
      case 'list':
        return <ListWidget widget={widget} />;
      case 'custom':
        return <div>Custom Widget</div>;
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
