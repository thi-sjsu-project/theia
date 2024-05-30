import type { Widget } from 'src/types/widget';
import SortElement from '../Element/Complex/SortElement';
import { useAppSelector } from 'src/redux/hooks';
import { getActiveConversationId } from 'src/redux/slices/communicationSlice';
import { getConversation } from 'src/redux/slices/conversationSlice';

type SortWidgetProps = {
  widget: Widget;
};

const PearceHeader = ({ widget }: SortWidgetProps) => {
  const { elements } = widget;

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
        className="absolute bg-[#1e1e1e]  rounded-2xl p-1"
        style={{ width: '300px', height: '80px', top: '10px', left: '1550px' }}
      >
        <SortElement options={elements.filter((el) => el.type === 'sort')} />
      </div>
    </div>
  );
};

export default PearceHeader;
