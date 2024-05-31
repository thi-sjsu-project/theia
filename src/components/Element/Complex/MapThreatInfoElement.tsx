import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateElement } from 'src/redux/slices/minimapSlice';
import type { InformationElement } from 'src/types/element';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';
import {getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import { getCommunication, updateCommunication } from 'src/redux/slices/communicationSlice';

type Props = {
  element: InformationElement;
  inGaze: boolean;
};

const M_HEIGHT = 60;

const MapThreatInfoElement = ({ element, inGaze }: Props) => {
  const communications = useAppSelector(getCommunication);
  const dispatch = useAppDispatch();
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
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
    for(let gk of gazesAndKeys){
      if(gk.keyPress === "1"){
            if(element === undefined || gk.elemsInGaze[0] === undefined){
                break;
            }
            if(element.id == gk.elemsInGaze[0].id && element.type == 'information'){
            console.log(element);
            dispatch(updateCommunication({
              ...communications,
              //@ts-ignore 
              activeConversationId: element.message.conversationId,
            }));
            }
      }
    }
  }, [gazesAndKeys]);
    
  
  
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
            LARGE: {cfl(target)}
          </div>
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

export default MapThreatInfoElement;
