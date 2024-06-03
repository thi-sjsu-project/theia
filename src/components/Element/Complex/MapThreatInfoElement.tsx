import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getStressLevel, updateElement } from 'src/redux/slices/cmSlice';
import type {
  Element,
  InformationElement,
  RequestApprovalElement as RequestApprovalElementType,
  ApproveDenyButtonElement as ApproveDenyButtonElementType,
} from 'src/types/element';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';
import RequestApprovalElement from './RequestApprovalElement';
import { getConversation } from 'src/redux/slices/conversationSlice';
import { getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import {
  getCommunication,
  updateCommunication,
} from 'src/redux/slices/communicationSlice';

type Props = {
  elements: Element[];
  inGaze: boolean;
};

const M_HEIGHT = 60;
const L_HEIGHT = 488;

const MapThreatInfoElement = ({ elements, inGaze }: Props) => {
  const stressLevel = useAppSelector(getStressLevel);

  const communication = useAppSelector(getCommunication);
  const dispatch = useAppDispatch();
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const elementsInGaze = useAppSelector(getElementsInGaze);

  // could also fetch messages from redux
  // provided there is a conversation number
  const [informationElement, requestApprovalElement, approveDenyButtonElement] =
    elements;
  const { title, message, collapsed, h, w, size, escalate, deescalate } =
    informationElement as InformationElement;
  let target;

  const conversation = useAppSelector((state) =>
    getConversation(state, message.conversationId),
  );
  const messages = conversation.messages;
  if (message.kind === 'ThreatDetected') {
    target = message.data.target.type;
  } else {
    target = 'missile';
  }

  useEffect(() => {
    if (
      gazesAndKeys.some((gk) => gk.keyPress === '1') &&
      elementsInGaze.some((element) => element.id === informationElement.id)
    ) {
      dispatch(
        updateCommunication({
          ...communication,
          activeConversationId: (informationElement as InformationElement)
            .message.conversationId,
          videoRequestConversationId: (informationElement as InformationElement)
            .message.conversationId,
        }),
      );
    }
  }, [
    informationElement.id,
    gazesAndKeys,
    elementsInGaze,
    dispatch,
    informationElement,
  ]);

  useEffect(() => {
    // react to deescalation
    if (deescalate) {
      dispatch(
        updateElement(informationElement.widgetId!, {
          ...informationElement,
          collapsed: true,
          deescalate: false,
          expiration: undefined,
        }),
      );
    }
  }, [dispatch, informationElement, deescalate]);

  if (collapsed) return null;

  const renderElement = () => {
    switch (stressLevel) {
      case 0:
        if (
          messages[0].kind === 'RequestApprovalToAttack' &&
          requestApprovalElement
        ) {
          return (
            <RequestApprovalElement
              element={requestApprovalElement as RequestApprovalElementType}
              inGaze={inGaze}
              approveDenyButton={
                approveDenyButtonElement as ApproveDenyButtonElementType
              }
            />
          );
        } else {
          return (
            <div
              id={informationElement.id}
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
        }
      case 1:
        return (
          <div
            id={informationElement.id}
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
      case 2:
        return (
          <div
            id={informationElement.id}
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
