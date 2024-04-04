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
  addMessage,
} from 'src/redux/slices/cmSlice';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';
import useSelector from 'src/prototype/useSelector';
import assimilator from 'src/prototype/assimilator';
import generateMessage from 'src/utils/generateMessage';
import type { Message } from 'src/types/schema-types';
import type { Widget } from 'src/types/modalities';
import useRestrainer from 'src/prototype/useRestrainer';
import { generateModalityMeasure } from 'src/utils/restrainerConst';
import restrainer from 'src/prototype/useRestrainer';

const Prototype = () => {
  const dispatch = useAppDispatch();

  const widgets = useAppSelector(getWidgets);
  const grid = useAppSelector(getGrid);
  const messages = useAppSelector(getMessages);

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
      if(!restrainer({ visualComplexity:generateModalityMeasure(), audioComplexity:generateModalityMeasure() })) return;

      // dispatch action to add new widget
      dispatch(addWidgetToGrid(widgetToDeploy));
      dispatch(addWidget(widgetToDeploy));
    }
  };

  const handleNewMessage = () => {
    const newMessage: Message = generateMessage();
    dispatch(addMessage(newMessage));
  };

  useEffect(() => {
    // use setInterval to run monitor every second (1000ms)
    const interval = setInterval(() => monitor({ dispatch }), ONE_SECOND_IN_MS);
    // clear interval when component unmounts to prevent memory leak
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-stone-200 h-screen flex justify-end">
      <div className="bg-violet-300 w-full flex items-center justify-center">
        <div className="bg-yellow-300 container divide-y divide-x divide-stone-300 grid grid-cols-4 w-[40rem] h-[40rem]">
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <div className="flex items-center justify-center">
                {/* widget information here */}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="bg-red-100 w-[40rem] flex flex-col items-center gap-4">
        <div className="bg-green-200 w-full h-96 px-2 py-1">
          <p className="text-center">List of Messages:</p>
          <ul className="overflow-y-scroll h-80">
            {messages.map((msg) => (
              <li key={msg.id}>{msg.kind}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleNewMessage}
          className="w-40 bg-transparent hover:bg-blue-500 
      text-blue-700 font-semibold hover:text-white py-2 
      px-4 border border-blue-500 hover:border-transparent 
      rounded text-sm"
        >
          New Message
        </button>
      </div>
    </div>
  );
};

export default Prototype;
