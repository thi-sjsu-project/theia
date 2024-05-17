import type { Widget as WidgetType } from 'src/types/widget';
import ListWidget from 'src/components/Widget/ListWidget';
import VehicleWidget from 'src/components/Widget/VehicleWidget';
import MapWarningWidget from 'src/components/Widget/MapWarningWidget';
import HistoryWidget from 'src/components/Widget/HistoryWidget';
import AcaHeaderWidget from 'src/components/Widget/AcaHeaderWidget';

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
      case 'map-warning':
        return <MapWarningWidget widget={widget} />;
      case 'history':
        return <HistoryWidget widget={widget} />;
      // Jeff, if you uncomment this, then header widget will be displayed -- Jagjit
      // case 'aca-header':
      //   return <AcaHeaderWidget widget={widget} />;
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
