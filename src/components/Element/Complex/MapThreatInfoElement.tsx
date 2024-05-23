import { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { updateElement } from 'src/redux/slices/minimapSlice';
import type { InformationElement } from 'src/types/element';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';
import TableElement from '../Simple/TableElement';

type Props = {
  element: InformationElement;
  inGaze: boolean;
};

const M_HEIGHT = 60;
const L_HEIGHT = 488;

const MapThreatInfoElement = ({ element, inGaze }: Props) => {
  const dispatch = useAppDispatch();
  // could also fetch messages from redux
  // provided there is a conversation number
  const { title, message, collapsed, h, w, size, escalate, deescalate } =
    element;
  let target;

  if (message.kind === 'RequestApprovalToAttack') {
    target = message.data.target.type;
  } else {
    target = 'missile';
  }

  useEffect(() => {
    // react to deescalation
    if (deescalate) {
      dispatch(
        updateElement(element.widgetId!, {
          ...element,
          collapsed: true,
          deescalate: false,
          expiration: undefined,
        }),
      );
    }
  }, [dispatch, element, deescalate]);

  if (collapsed) return null;

  const renderElement = () => {
    switch (size) {
      case 'S':
        return (
          <div
            id={element.id}
            style={{
              height: h,
              width: w,
              fontSize: 24,
              backgroundColor: 'turquoise',
              opacity: 0.8,
            }}
          >
            SMALL: {cfl(target)}
          </div>
        );

      case 'M':
        return (
          <div
            id={element.id}
            className="rounded-xl bg-[#282828] bg-opacity-80 text-[#f5f5f5] border-black border-2 text-[24px]"
            style={{
              height: M_HEIGHT,
              width: 'auto',
            }}
          >
            <div
              className="px-5 py-2.5 font-medium"
              style={{ height: M_HEIGHT }}
            >
              {cfl(target)}
            </div>
            {inGaze ? <GazeHighlight /> : <></>}
          </div>
        );

      case 'L':
        return (
          <>
            <div
              className={
                inGaze
                  ? 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl border-turquoise border-x-[5px] '
                  : 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl'
              }
            >
              {/* <div className="grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl"> */}
              <div className="font-medium text-4xl mb-[5px]">
                SA_4 Air Defense Threat
              </div>
              <div className="grid grid-cols-[40px_1fr]">
                <div className="flex-auto bg-turquoise text-black text-2xl text-center h-fit font-semibold rounded-l-md">
                  4
                </div>

                <div className="bg-convo-bg h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                  <div className="grid grid-cols-1">
                    <div className="col-span-2 flex flex-col">
                      <div className="font-medium text-[28px]">
                        ACA-7: Request to attack
                      </div>
                      <div className="font-2xl">Kinetic attack approval</div>
                    </div>

                    <div className="col-span-4 text-left">
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
              </div>
              <div className="grid grid-cols-[40px_1fr]">
                <div className="flex-auto bg-[#3E3E42] text-white/50 text-2xl text-center h-fit font-normal rounded-l-md">
                  3
                </div>
                <div className="bg-[#252526] text-[#BCBCBC] px-[20px] py-[5px]">
                  Update: threat-level high
                </div>
              </div>
              <div className="grid grid-cols-[40px_1fr]">
                <div className="flex-auto bg-[#3E3E42] text-white/50 text-2xl text-center h-fit font-normal rounded-l-md">
                  2
                </div>
                <div className="bg-[#252526] text-[#BCBCBC] px-[20px] py-[5px]">
                  Update: location changed
                </div>
              </div>
            </div>
            {/* {inGaze ? <GazeHighlightL /> : <></>} */}
          </>
          // <div
          //   id={element.id}
          //   style={{
          //     height: h,
          //     width: w,
          //     fontSize: 24,
          //     backgroundColor: 'turquoise',
          //     opacity: 0.8,
          //   }}
          // >
          //   LARGE: {cfl(target)}
          // </div>
        );
    }
  };

  return <>{renderElement()}</>;
};

const GazeHighlight = () => {
  return (
    <>
      <div
        className="w-auto rounded-xl border-[#19DEBB] border-x-[5px]"
        style={{ height: M_HEIGHT - 4, marginTop: -M_HEIGHT }}
      ></div>
      <div className="mx-auto mt-1" style={{ width: 26, height: 13 }}>
        <svg style={{ width: 26, height: 15 }}>
          <polygon
            points="1,1 26,1 14,14"
            style={{ fill: '#19DEBB', stroke: '#3E3E42', strokeWidth: 2 }}
          />
        </svg>
      </div>
    </>
  );
};

const GazeHighlightL = () => {
  return (
      <div
        className="w-auto rounded-xl border-[#19DEBB] border-x-[5px]"
        style={{ height: L_HEIGHT - 4, marginTop: -L_HEIGHT }}
      ></div>
  );
};

export default MapThreatInfoElement;
