import { useState } from 'react';
import type { SortMethod } from 'src/types/sortMethod';
import type { Widget } from 'src/types/widget';
import SortElement from '../Element/Complex/SortElement';

type SortWidgetProps = {
  widget: Widget;
};

const sortFunctions: { [key: string]: SortMethod } = {
  priority: (a, b) => a?.priority! - b?.priority!,
  time: (_a, _b) => -1,
  gaia: (a, b) => 1,
};

const PearceHeader = ({ widget }: SortWidgetProps) => {
  const [sortMethod, setSortMethod] = useState<SortMethod>(
    () => sortFunctions.priority,
  );

  const toggleSort = (val: SortMethod) => {
    console.log('setting sort method to', val);
    setSortMethod(val);
  };

  console.log('hereS');

  return (
    <div
      key={widget.id}
      id={widget.id}
      className="absolute bg-[#252526] shadow-lg shadow-[#181818]"
      style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
      }}
    >
      <span className="h-full flex flex-row justify-center items-center text-6xl text-white">
        title
      </span>

      <div
        className="absolute h-full flex flex-row gap-4 items-center justify-center p-3"
        style={{ width: '300px', top: '0px', left: '1550px' }}
      >
        {Object.entries(sortFunctions).map(([key, val]) => {
          return <SortElement isActive={false} name={key} sortMethod={val} />;
        })}
      </div>
    </div>
  );
};

export default PearceHeader;
