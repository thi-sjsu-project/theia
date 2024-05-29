import { useState } from 'react';
import type { SortMethod, SortTypes } from 'src/types/sortMethod';
import type { Widget } from 'src/types/widget';
import SortElement from '../Element/Complex/SortElement';
import { useAppSelector } from 'src/redux/hooks';
import { getActiveConversationId } from 'src/redux/slices/communicationSlice';
import { getConversation } from 'src/redux/slices/conversationSlice';

type SortWidgetProps = {
  widget: Widget;
};

const sortFunctions: { [key: string]: { name: string; func: SortMethod } } = {
  gaia: {
    name: 'gaia',
    func: (a, b) => 1,
  },
  priority: {
    name: 'priority',
    func: (a, b) => a?.priority! - b?.priority!,
  },
  time: {
    name: 'time',
    func: (_a, _b) => -1,
  },
};

const PearceHeader = ({ widget }: SortWidgetProps) => {
  const [sortMethod, setSortMethod] = useState<SortTypes>('priority');

  const toggleSort = (val: SortTypes) => {
    console.log('setting sort method to', val);
    setSortMethod(val);
  };

  const activeConvoID = useAppSelector(getActiveConversationId);
  const activeConvo = useAppSelector((state) =>
    getConversation(state, activeConvoID),
  );

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
      <span className="h-full text-6xl text-white flex flex-row items-center justify-center">
        {(activeConvo && activeConvo.id) ?? 'title'}
      </span>

      <div
        className="absolute bg-[#1e1e1e] flex flex-row items-center justify-center rounded-2xl p-1"
        style={{ width: '300px', height: '80px', top: '10px', left: '1550px' }}
      >
        {Object.entries(sortFunctions).map(([key, val], index) => {
          return (
            <div
              className="h-full"
              onMouseEnter={() => setSortMethod(val.name)}
            >
              <SortElement
                isActive={val.name === sortMethod}
                name={key}
                sortMethod={val.func}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PearceHeader;
