import { type HistoryWidget as HistoryWidgetType } from 'src/types/widget';
import TableElement from '../Element/Simple/TableElement';

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
      className={`absolute text-white `}
    >
      <div className="grid grid-cols-12 items-start justify-start p-4 gap-4">

        {/* TODO : extract out into HistoryMessageElement. Currently is mock data to test look */}

        <div className="col-span-1 flex flex-col h-full">
          <span className="bg-[#19debb] text-black text-xl font-bold flex flex-row py-1 mx-2 rounded-md items-center justify-center">
            4
          </span>
          <div className="border-[#656566] h-full w-1/2 border-r-4 mt-4 flex flex-row items-center justify-center rounded-sm" />
        </div>

        <div className="col-span-11 bg-[#252526] h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-6">
            <div className="col-span-2 flex flex-col gap-5">
              <div className="font-semibold text-xl">
                <div className="text-[#97979d]">ACA-7</div>
                Request to attack
              </div>
              <div className="font-normal">Approval for kinetic attack</div>
            </div>

            <div className="col-span-4 w-full">
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
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col h-full">
          <span className="bg-[#2d2d30] text-white text-xl font-bold flex flex-row py-1 mx-3 rounded-md items-center justify-center">
            3
          </span>
          <div className="border-[#656566] h-full w-1/2 border-r-4 mt-4 flex flex-row items-center justify-center rounded-sm" />
        </div>

        <div className="col-span-11 bg-[#252526] h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-6">
            <div className="col-span-2 flex flex-col gap-5">
              <div className="font-semibold text-xl">
                <div className="text-[#97979d]">Update</div>
                Threat Level High
              </div>
              <div className="font-normal"></div>
            </div>

            <div className="col-span-4 w-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryWidget;
