import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h, elements } = widget;

  console.log('elements: ', elements);

  return (
    <div
      key={id}
      style={{ top: y, left: x, width: w, height: h }}
      className={`absolute bg-[#2D2D30] text-white grid grid-cols-12 items-start justify-start p-4`}
    >
      <div className="col-span-1 flex flex-col h-full">
        <span className="bg-teal-300 flex flex-row py-1 mx-4 rounded-md items-center justify-center">
          4
        </span>
        <div className="border-gray-200 h-full w-1/2 border-r-4 my-4 flex flex-row items-center justify-center rounded-sm" />
      </div>

      <div className="col-span-11 bg-gray-300">message content</div>
      <div className="col-span-1 flex flex-col">test</div>
    </div>
  );
};

export default HistoryWidget;
