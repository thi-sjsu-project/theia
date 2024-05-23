import { type TableElement } from 'src/types/element';

type HistoryMessageProps = {
  title: string;
  header: string;
  desc?: string;
  tableContent?: React.ReactElement<TableElement>;
};

const HistoryMessage = ({
  title,
  header,
  desc,
  tableContent,
}: HistoryMessageProps) => {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-2 flex flex-col gap-5">
        <div className="font-semibold leading-8" style={{ fontSize: 28 }}>
          <span className="text-muted-gray">{title}</span>
          <br />
          {header}
        </div>
        <div className="font-normal" style={{ fontSize: 24 }}>
          {desc}
        </div>
      </div>

      <div className="col-span-4 w-full">{tableContent}</div>
    </div>
  );
};

export default HistoryMessage;
