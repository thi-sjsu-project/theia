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
        <div className="font-semibold text-xl">
          <div className="text-muted-gray">{title}</div>
          {header}
        </div>
        <div className="font-normal">{desc}</div>
      </div>

      <div className="col-span-4 w-full px-5">{tableContent}</div>
    </div>
  );
};

export default HistoryMessage;
