import type { ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import IconElement from '../Simple/IconElement';
import TableElement from '../Simple/TableElement';
import { getConversationMessages, getWidgetById } from 'src/redux/slices/minimapSlice';
import { useAppSelector } from 'src/redux/hooks';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  inGaze?: boolean;
  children?: ReactNode;
};

const RequestApprovalElement = ({
  element,
  inGaze,
  children,
}: RequestApprovalProps) => {
  // Getting widget to know the screen that the element is on
  const widget = useAppSelector((state) =>
    getWidgetById(state, element.widgetId!),
  );

  const requests: any = useAppSelector((state) => getConversationMessages(state, widget!.conversationId!));

  // Transform threat level from a float number in a range of 0-1 to a string of low, medium, high
  const threatLevelString = (threatLevel: number) => {
    const threatLevelInteger = Math.floor(threatLevel * 3);
    return ['low', 'medium', 'high'][threatLevelInteger];
  };

  // Just returns the categories, but not the actual values of the differences, which could be added later
  const findDifferenceInRequests = (request1: any, request2: any) => {
    const differences: string[] = [];
    if (request1.data.target.location.x !== request2.data.target.location.x) {
      differences.push('location');
    } else if (request1.priority !== request2.priority) {
      differences.push('priority');
    } else if (request1.data.target.threatLevel !== request2.data.target.threatLevel) {
      differences.push('threat-level');
    } else if (request1.data.collateralDamage !== request2.data.collateralDamage) {
      differences.push('col.damage');
    }

    return differences;
  }

  const addMoreRequests = (requestsLength: number, requests: any) => {
    let uiElements: any = [];
    let count = requestsLength;
    while (--count > 0) {
      uiElements.push(
        <div className="grid grid-cols-[40px_1fr]">
          <div className="flex-auto bg-[#3E3E42] text-white/50 text-2xl text-center h-fit font-normal rounded-l-md">
            {count}
          </div>
          <div className="bg-[#252526] text-[#BCBCBC] px-[20px] py-[5px]">
            {/* {findDifferenceInRequests(requests[0], requests[count]).join(', ')} */}
            Update: priority level changed
          </div>
        </div>,
      );
    }
    return uiElements;
  }

  const renderMiniMapRequestApprovalElement = () => {
    const mainRequest = requests[0];

    return (
      <div
        className={
          inGaze
            ? 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl border-turquoise border-x-[5px] '
            : 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl'
        }
      >
        <div className="font-medium text-4xl mb-[5px]">{cfl(mainRequest.data.target.type)}</div>
        <div className="grid grid-cols-[40px_1fr]">
          <div className="flex-auto bg-turquoise text-black text-2xl text-center h-fit font-semibold rounded-l-md">
            {requests.length}
          </div>

          <div className="bg-convo-bg h-fit p-4 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1">
              <div className="col-span-2 flex flex-col">
                <div className="font-medium text-[28px]">
                  ACA-{mainRequest.data.detectedByAca}: Request to attack
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
                      [
                        'location',
                        mainRequest.data.target.location.x +
                          ', ' +
                          mainRequest.data.target.location.y,
                      ],
                      ['priority', mainRequest.priority.toString()],
                      [
                        'threat-level',
                        threatLevelString(mainRequest.data.target.threatLevel),
                      ],
                      ['col.damage', mainRequest.data.collateralDamage],
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {addMoreRequests(requests.length, requests).map((element: any) => element)}
      </div>
    );
  };

  if (widget!.screen === '/pearce-screen') {
    return (
      <div id={element.id} className="flex text-white items-center gap-4">
        <IconElement element={element.icon} />
        <span>{element.type}</span>
      </div>
    );
  } else if (widget!.screen === '/minimap') {
    return renderMiniMapRequestApprovalElement();
  }
}

export default RequestApprovalElement;
