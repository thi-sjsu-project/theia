import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import monitor from 'src/prototype/monitor';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { addWidget, getWidgetById, getWidgets } from 'src/redux/slices/cmSlice';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';
import type { Widget } from 'src/types/modalities';
import useSelector from 'src/prototype/useSelector';
import type { MissileToOwnshipDetected } from 'src/types/schema-types';

const dummyMessage: MissileToOwnshipDetected = {
  id: 1234,
  priority: 10,
  kind: 'MissileToOwnshipDetected',
  data: {
    missileLocation: { lat: 0, lng: 0 },
    survivability: 0,
    detectedByAca: undefined,
    acaAttackWeapon: undefined,
    choiceWeight: 0,
  },
};

const Prototype = () => {
  const dispatch = useAppDispatch();
  const { message, possibleModalities } = useSelector({
    message: dummyMessage,
  });

  console.log('message:', message, 'possibleModalities:', possibleModalities);

  // demonstration of using a selector to access redux state
  const widgets = useAppSelector(getWidgets);
  console.log('widgets:', widgets);

  // get single widget by id
  // const oneWidget = useAppSelector((store) => getWidgetById(store, '1'));
  // console.log('oneWidget:', oneWidget);

  // demonstration of using dispatch function to update redux state
  const handleAddWidget = () => {
    const expirationTime = new Date();
    console.log(expirationTime);
    expirationTime.setSeconds(
      expirationTime.getSeconds() + (Math.floor(Math.random() * 10) + 5),
    ); //set the time to expire to a time between 5 and 15 seconds
    console.log(expirationTime);

    // construct dummy widget
    const newWidget: Widget = {
      id: uuid(),
      elements: [
        {
          id: uuid(),
          expiration: expirationTime.toISOString(),
          modality: 'auditory',
          type: 'table',
        },
      ],
    };

    // dispatch action to add new widget
    dispatch(addWidget(newWidget));
  };

  useEffect(() => {
    // use setInterval to run monitor every second (1000ms)
    const interval = setInterval(() => monitor({ widgets }), ONE_SECOND_IN_MS);
    // clear interval when component unmounts to prevent memory leak
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      List of widgets:
      <ul>
        {widgets.map((widget) => (
          <li key={widget.id}>
            id: {widget.id}, Elements: [
            {widget.elements.map((widget) => (
              <span key={widget.id}>
                widgetId: {widget.id}, expiration: {widget.expiration},{' '}
                {widget.modality}, type: {widget.type}
              </span>
            ))}
            ]
          </li>
        ))}
      </ul>
      <button onClick={handleAddWidget}>Add widget</button>
    </div>
  );
};

export default Prototype;
