import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h, elements } = widget;

  return (
    <div
      key={id}
      style={{ top: y, left: x, width: w, height: h }}
      className={`absolute bg-[#2D2D30] text-white flex items-center justify-center`}
    >
      History Widget
    </div>
  );
};

export default HistoryWidget;
