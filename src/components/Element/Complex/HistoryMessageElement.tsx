import HistorySidebar from 'src/ui/history/HistorySidebar';
import HistoryMessage from 'src/ui/history/HistoryMessage';
import { type TableElement } from 'src/types/element';

// minor todo: figure out how to union types of HistorySidebar and HistoryMessage without explicit export
type HistoryMessageElementProps = {
  index: number;
  isActive: boolean;

  title: string;
  header: string;
  desc?: string;
  tableContent?: React.ReactElement<TableElement>;
};

const HistoryMessageElement = ({
  index,
  isActive,
  title,
  header,
  desc,
  tableContent,
}: HistoryMessageElementProps) => {
  return (
    <>
      <div className="col-span-1 flex flex-col h-full">
        <HistorySidebar index={index} isActive={isActive} />
      </div>

      <div className="col-span-11 bg-convo-bg h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
        <HistoryMessage
          title={title}
          header={header}
          desc={desc}
          tableContent={tableContent}
        />
      </div>
    </>
  );
};

export default HistoryMessageElement;
