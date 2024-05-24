import type { ReactNode } from 'react';
import { type RequestApprovalElement as RequestApprovalElementType } from 'src/types/element';
import ButtonElement from '../Simple/ButtonElement';
import IconElement from '../Simple/IconElement';
import TableElement from '../Simple/TableElement';
import { getWidgetById, getWidgetsByConversationID } from 'src/redux/slices/minimapSlice';
import { useAppSelector } from 'src/redux/hooks';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';
import { useState } from 'react';

type RequestApprovalProps = {
  element: RequestApprovalElementType;
  requests?: RequestApprovalElementType[];
  newRequest?: RequestApprovalElementType;
  inGaze?: boolean;
  children?: ReactNode;
};

const RequestApprovalElement = ({
  requests,
  newRequest,
  inGaze,
  children,
}: RequestApprovalProps) => {
  const element = requests![0];
  const {
    id,
    collapsed,
    icon,
    rightButton,
    leftButton,
    message: {
      conversationId,
      priority,
      data: {
        target: { location, threatLevel, type },
        collateralDamage,
        detectedByAca,
      },
    },
  } = element;

  // Get all widgets on /minimap screen and get widgets that contain the same conversationId
  const widgets = useAppSelector((state) =>
    getWidgetsByConversationID(state, conversationId),
  );

  // Transform threat level from a float number in a range of 0-1 to a string of low, medium, high
  const threatLevelString = (threatLevel: number) => {
    const threatLevelInteger = Math.floor(threatLevel * 3);
    return ['low', 'medium', 'high'][threatLevelInteger];
  };

  // Getting widget to know the screen that the element is on
  const widget = useAppSelector((state) =>
    getWidgetById(state, element.widgetId!),
  );

  // if (collapsed) {
  //   return (
  //     <div className="flex gap-2 items-center">
  //       <IconElement element={icon} />
  //       <span>Request Approval to Attack</span>
  //     </div>
  //   );
  // }

  // <div className="flex gap-2">
  //   <ButtonElement element={leftButton} />
  //   <ButtonElement element={rightButton} />
  // </div>

  // For now we are just going to sort the requests by priority, but later on could be more complicated
  const sortRequests = (requests: any) => {
    return requests.sort((a: any, b: any) => a.priority - b.priority);
  };

  const addMoreRequests = (requestsLength: number) => {
    let uiElements: any = [];
    let count = requestsLength;
    while (--count > 0) {
      uiElements.push(
        <div className="grid grid-cols-[40px_1fr]">
          <div className="flex-auto bg-[#3E3E42] text-white/50 text-2xl text-center h-fit font-normal rounded-l-md">
            {count}
          </div>
          <div className="bg-[#252526] text-[#BCBCBC] px-[20px] py-[5px]">
            Update: threat-level high
          </div>
        </div>,
      );
    }
    return uiElements;
  }

  const renderMiniMapRequestApprovalElement = () => {
    const sortedRequests = sortRequests(requests);
    console.log('sortedRequests: ', sortedRequests);
    const mainRequest = sortedRequests[0].message;

    return (
      <div
        className={
          inGaze
            ? 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl border-turquoise border-x-[5px] '
            : 'grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl'
        }
      >
        {/* <div className="grid auto-row-auto gap-y-[5px] p-[15px_20px_30px_30px] text-white bg-[#282828] bg-opacity-90 rounded-xl"> */}
        <div className="font-medium text-4xl mb-[5px]">{cfl(type)}</div>
        <div className="grid grid-cols-[40px_1fr]">
          <div className="flex-auto bg-turquoise text-black text-2xl text-center h-fit font-semibold rounded-l-md">
            {sortedRequests.length}
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
        {addMoreRequests(sortedRequests.length).map((element: any) => element)}
      </div>
    );
  };

  if (widget!.screen === '/pearce-screen') {
    return (
      <div id={id} className="flex text-white items-center gap-4">
        <IconElement element={icon} />
        <span>{type}</span>
      </div>
    );
  } else if (widget!.screen === '/minimap') {
    return renderMiniMapRequestApprovalElement();
  }
}

export default RequestApprovalElement;
