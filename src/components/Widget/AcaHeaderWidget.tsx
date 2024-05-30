import type { AcaHeaderWidget as AcaHeaderWidgetType } from 'src/types/widget';
import type { AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import AcaStatusElement from 'src/components/Element/Complex/AcaStatusElement';
import NOTCH from 'src/assets/icons/Ownship Notch.svg';
import REACTION from 'src/assets/icons/Action Required Notch.svg';
import ALERT from 'src/assets/icons/Alert Notch.svg';
import { useAppSelector } from 'src/redux/hooks';
import { getMessages } from 'src/redux/slices/conversationSlice';
import { useEffect } from 'react';

type AcaHeaderWidgetProps = {
  widget: AcaHeaderWidgetType;
};

const AcaHeaderWidget = ({ widget }: AcaHeaderWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  var firstElements = structuredClone(elements);
  const lastElements = firstElements.splice(4);
  const messages = useAppSelector(getMessages);

  const getNotch = () => {
    const latestMessage = messages[messages.length - 1];
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
    const acaId = Number(
      latestMessage.tags?.find((tag) => tag.startsWith('aca-'))?.split('-')[1],
    );

    if (!acaId) return;

    // @ts-ignore
    const aca = elements.find((element) => element.acaId === acaId);

    console.log(aca);
  }, [messages]);

  const notch = getNotch();

  return (
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
        />
      ))}
      <div>
        <img src={notch} alt="notch" className="-mt-4" />
      </div>

      <div className="grow" />
      {lastElements.map((element) => (
        <AcaStatusElement
          key={element.id}
          element={element as AcaStatusElementType}
        />
      ))}
    </div>
  );
};

export default AcaHeaderWidget;
