import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import TableElement from '../Element/Simple/TableElement';
import HistoryMessageElement from '../Element/Complex/HistoryMessageElement';

type HistoryWidgetProps = {
  widget: HistoryWidgetType;
};

const HistoryWidget = ({ widget }: HistoryWidgetProps) => {
  const { id, x, y, w, h, elements } = widget;

  console.log('elements: ', widget);

  return (
    <div
      key={id}
      style={{ top: y, left: x, width: w, height: h }}
      className={`absolute text-white `}
    >
      <div className="grid grid-cols-12 items-start justify-start p-4 gap-4">

        {/* TODO : pass in convo message parameters. Currently is mock data to test look */}
        {/* to be removed */}

        <HistoryMessageElement
          index={4}
          isActive={true}
          title="ACA-7"
          header="Request to attack"
          desc="Approval for kinetic attack"
          tableContent={
            <TableElement
              element={{
                id: 'convoID_<el.index>',
                modality: 'visual',
                h: 3,
                w: 4,

                type: 'table',
                rows: 4,
                cols: 2,
                tableData: [
                  ['location', '34N, 118W'],
                  ['priority', 'high'],
                  ['threat-level', 'high'],
                  ['col.damage', '45%'],
                ],
              }}
            />
          }
        />

        <HistoryMessageElement
          index={3}
          isActive={false}
          title="Update"
          header="Threat level high"
          tableContent={
            <TableElement
              element={{
                id: 'convoID_<el.index>',
                modality: 'visual',
                h: 3,
                w: 4,

                type: 'table',
                rows: 2,
                cols: 2,
                tableData: [
                  ['priority', 'high'],
                  ['threat-level', 'high'],
                ],
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default HistoryWidget;
