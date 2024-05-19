import { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { updateElement } from 'src/redux/slices/minimapSlice';
import type { InformationElement } from 'src/types/element';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';

type Props = {
  element: InformationElement;
};

const MapThreatInfoElement = ({ element }: Props) => {
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
    // set its own expiration time in the beginning as soon as it is rendered
    if (!collapsed && !element.expiration && element.expirationInterval) {
      const expireAt = new Date();
      expireAt.setMilliseconds(
        expireAt.getMilliseconds() + element.expirationInterval,
      );

      dispatch(
        updateElement(element.widgetId!, {
          ...element,
          expiration: expireAt.toISOString(),
        }),
      );
    }
  }, [collapsed, element, dispatch]);

  useEffect(() => {
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
            style={{
              height: h,
              width: w,
              fontSize: 24,
              backgroundColor: 'turquoise',
              opacity: 0.8,
            }}
          >
            MEDIUM {cfl(target)}
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

export default MapThreatInfoElement;
