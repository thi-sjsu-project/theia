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

const SortWidget = ({ widget }: SortWidgetProps) => {
  const [sortMethod, setSortMethod] = useState<SortMethod>(
    () => sortFunctions.priority,
  );

  const toggleSort = (val: SortMethod) => {
    console.log('setting sort method to', val);
    setSortMethod(val);
  };

  console.log("hereS")

  return (
    <div
      key={widget.id}
      id={widget.id}
// className='w-full z-50'
      style={{
        height: widget.h,
        width: widget.w,
        top: widget.y,
        left: widget.x,
      }}
    >
      <span className='text-6xl text-white z-50'>testing</span>
      {/* <div className="w-full  h-fit py-6 inline-flex gap-4 items-center justify-center">
        {Object.entries(sortFunctions).map(([key, val]) => {
          return <SortElement isActive={false} name={key} sortMethod={val} />;
        })}
      </div> */}
    </div>
  );
};

export default SortWidget;
