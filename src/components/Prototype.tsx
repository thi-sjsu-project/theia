import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import monitor from 'src/prototype/monitor';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addWidget,
  addWidgetToGrid,
  getWidgets,
  getGrid,
  getMessages,
} from 'src/redux/slices/cmSlice';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';
import useSelector from 'src/prototype/useSelector';
import assimilator from 'src/prototype/assimilator';
import type { Widget } from 'src/types/modalities';
import generateMessage from 'src/utils/generateMessage';

const Prototype = () => {
  const dispatch = useAppDispatch();

  const widgets = useAppSelector(getWidgets);
  const grid = useAppSelector(getGrid);
  const messages = useAppSelector(getMessages);

  console.log('messages:', messages);

  // demonstration of using dispatch function to update redux state
  const handleAddWidget = () => {
    const expirationTime = new Date();
    expirationTime.setSeconds(
      expirationTime.getSeconds() + (Math.floor(Math.random() * 10) + 5),
    ); //set the time to expire to a time between 5 and 15 seconds

    // construct dummy widget
    const newWidget: Widget = {
      id: uuid(),
      elements: [
        {
          id: uuid(),
          expiration: expirationTime.toISOString(),
          onExpiration: 'delete',
          modality: 'auditory',
          type: 'table',
        },
      ],
    };

    const { widgetToDeploy } = assimilator({
      //find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: [newWidget],
      grid,
    });

    if (widgetToDeploy) {
      //if we can actually place the widget

      //ADD RESTRAINER HERE TO CHECK IF WE CAN PLACE THE WIDGET

      // dispatch action to add new widget
      dispatch(addWidgetToGrid(widgetToDeploy));
      dispatch(addWidget(widgetToDeploy));
    }
  };

  useEffect(() => {
    // use setInterval to run monitor every second (1000ms)
    const interval = setInterval(() => monitor({ dispatch }), ONE_SECOND_IN_MS);
    // clear interval when component unmounts to prevent memory leak
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // generate a message every 5 seconds
    const interval = setInterval(() => generateMessage({ dispatch }), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-100">
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
