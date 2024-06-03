import type { AcaHeaderWidget as AcaHeaderWidgetType } from 'src/types/widget';
import type {
  AcaMessageElement,
  AcaStatusElement as AcaStatusElementType,
} from 'src/types/element';
import AcaStatusElement from 'src/components/Element/Complex/AcaStatusElement';
import NOTCH from 'src/assets/icons/Ownship Notch.svg';
import REACTION from 'src/assets/icons/Action Required Notch.svg';
import ALERT from 'src/assets/icons/Alert Notch.svg';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getMessages } from 'src/redux/slices/conversationSlice';
import { useEffect } from 'react';
import { addElementsToWidget } from 'src/redux/slices/cmSlice';
import type { Message } from 'src/types/schema-types';
import { NUM_ACAS } from 'src/prototype/utils/constants';

type AcaHeaderWidgetProps = {
  widget: AcaHeaderWidgetType;
};

const getAcaMessageText = (kind: Message['kind']) => {
  switch (kind) {
    case 'AcaDefect':
      return 'Aca Defect';
    case 'AcaFuelLow':
      return 'Fuel Low';
    case 'AcaHeadingToBase':
      return 'Heading to Base';
    default:
      return 'N/A';
  }
};

const AcaHeaderWidget = ({ widget }: AcaHeaderWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  // 4 first and 4 last elements
  var firstElements = structuredClone(elements);
  const lastElements = firstElements.splice(NUM_ACAS / 2);

  // rest are notification elements
  const notifElements = lastElements.splice(NUM_ACAS / 2);

  const messages = useAppSelector(getMessages);

  const dispatch = useAppDispatch();

  const getNotch = () => {
    let action = '';

    for (let message of messages) {
      if (message.fulfilled === false) {
        if (message.kind === 'RequestApprovalToAttack' && action !== 'ALERT') {
          action = 'REACTION';
        }
        if (message.kind === 'MissileToOwnshipDetected') {
          action = 'ALERT';
        }
      }
    }

    if (action === 'REACTION') {
      return REACTION;
    } else if (action === 'ALERT') {
      return ALERT;
    } else {
      return NOTCH;
    }
  };

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];

    if (!latestMessage) return;

    if (
      latestMessage.kind !== 'AcaDefect' &&
      latestMessage.kind !== 'AcaFuelLow' &&
      latestMessage.kind !== 'AcaHeadingToBase'
    ) {
      return;
    }

    const acaId = Number(
      latestMessage.tags?.find((tag) => tag.startsWith('aca-'))?.split('-')[1],
    );

    if (!acaId) return;

    // @ts-ignore
    const aca = elements.find((element) => element.acaId === acaId);

    if (Object.prototype.hasOwnProperty.call(aca, 'messages')) {
      // don't add message to the aca if it already has it

      // @ts-ignore
      if (!notifElements.some((message) => message.id === latestMessage.id)) {
        const fiveSecondsIntoFuture = new Date();
        fiveSecondsIntoFuture.setMilliseconds(
          fiveSecondsIntoFuture.getMilliseconds() + 8000,
        );

        dispatch(
          addElementsToWidget(widget.id, [
            {
              id: latestMessage.id,
              type: 'aca-message',
              modality: 'visual',
              // @ts-ignore
              statusElementId: aca.id,
              h: 72,
              w: 160,
              expiration: fiveSecondsIntoFuture.toISOString(),
              onExpiration: 'delete',
              text: getAcaMessageText(latestMessage.kind),
              widgetId: widget.id,
            } satisfies AcaMessageElement,
          ]),
        );
      }
    }
  }, [messages, widget.id, dispatch]);

  const notch = getNotch();

  return (
    <>
      <div
        style={{
          top: y,
          left: x,
          width: w,
          height: h,
        }}
        className="absolute bg-[#252526] flex gap-4 px-4 py-2"
      >
        {firstElements.map((element) => (
          <AcaStatusElement
            key={element.id}
            element={element as AcaStatusElementType}
            notification={
              notifElements.find(
                // @ts-ignore
                (notif) => notif.statusElementId === element.id,
              ) as AcaMessageElement
            }
          />
        ))}

        <div className="grow" />
        {lastElements.map((element) => (
          <AcaStatusElement
            key={element.id}
            element={element as AcaStatusElementType}
            notification={
              notifElements.find(
                // @ts-ignore
                (notif) => notif.statusElementId === element.id,
              ) as AcaMessageElement
            }
          />
        ))}
      </div>
      <div style={{ width: w }} className="text-center absolute">
        <img src={notch} alt="notch" className="inline-block" />
      </div>
    </>
  );
};

export default AcaHeaderWidget;
