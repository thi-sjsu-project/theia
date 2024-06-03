import type { Widget as WidgetType } from 'src/types/widget';
import ListWidget from 'src/components/Widget/ListWidget';
import VehicleWidget from 'src/components/Widget/VehicleWidget';
import MapWarningWidget from 'src/components/Widget/MapWarningWidget';
import HistoryWidget from 'src/components/Widget/HistoryWidget';
import AcaHeaderWidget from 'src/components/Widget/AcaHeaderWidget';
import EscalationModeWidget from 'src/components/Widget/EscalationWidget';
import VideoWidget from 'src/components/Widget/VideoWidget';
import LeftCornerMapWidget from 'src/components/Widget/LeftCornerMapWidget';
import BasicWidget from './BasicWidget';
import PearceHeader from './PearceHeader';

type WidgetProps = {
  widget: WidgetType;
};

const Widget = ({ widget }: WidgetProps) => {
  const renderWidget = () => {
    switch (widget.type) {
      case 'vehicle':
        return <VehicleWidget widget={widget} />;
      case 'basic':
        return <BasicWidget widget={widget} />;
      case 'list':
        return <ListWidget widget={widget} />;
      case 'map-warning':
        return <MapWarningWidget widget={widget} />;
      case 'history':
        return <HistoryWidget widget={widget} />;
      case 'aca-header':
        return <AcaHeaderWidget widget={widget} />;
      case 'escalation':
        return <EscalationModeWidget widget={widget} />;
      case 'pearce-header':
        return <PearceHeader widget={widget} />;
      case 'video-footage':
        return <VideoWidget widget={widget} />;
      case 'left-corner-map':
        return <LeftCornerMapWidget widget={widget} />;
      default:
        return <div>Unknown Widget</div>;
    }
  };

  return <>{renderWidget()}</>;
};

export default Widget;
