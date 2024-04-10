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
  toggleElementInteraction,
} from 'src/redux/slices/cmSlice';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';
import selector from 'src/prototype/selector';
import assimilator from 'src/prototype/assimilator';
import generateMessage from 'src/utils/generateMessage';
import type { Message } from 'src/types/schema-types';
import type { Widget } from 'src/types/modalities';
import { generateModalityMeasure } from 'src/utils/restrainerConst';
import restrainer from 'src/prototype/restrainer';

// unique id for each cell in the grid
const IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Prototype = () => {
  const dispatch = useAppDispatch();

  const widgets = useAppSelector(getWidgets);
  const grid = useAppSelector(getGrid);
  const messages = useAppSelector(getMessages);

  // run everytime there is a new message
  useEffect(() => {
    if (messages.length === 0) return;

    console.log('useEffect...handling new message');
    const { message, possibleModalities } = selector({
      message: messages[messages.length - 1],
    });

    const widget: Widget = {
      id: uuid(),
      elements: possibleModalities,
      type: "tinder",
      maxAmount: 1,
      size: [50,50],
      locationGrid: [[100,200], [150,250]],
      useElementLocation: false,
      canOverlap: false,
    };

    // call assimilator here...
    const { widgetToDeploy } = assimilator({
      //find if there is room for us to put the widget down (returns null if there is not room)
      possibleWidgets: [widget],
      grid,
    });

    // consult the restrainer here...
    if (widgetToDeploy) {
      //if we can actually place the widget

      //ADD RESTRAINER HERE TO CHECK IF WE CAN PLACE THE WIDGET
      /* if (
        !restrainer({
          visualComplexity: generateModalityMeasure(),
          audioComplexity: generateModalityMeasure(),
        })
      )
        return; */

      // dispatch action to add new widget
      dispatch(addWidgetToGrid(widgetToDeploy));
      dispatch(addWidget(widgetToDeploy));
    }

    // finally decide whether to dispatch addWidget action
  }, [messages]);

  const handleWidgetClick = (id: string) => {
    console.log('interacted with widget:', id);
    dispatch(toggleElementInteraction(id));
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
    <div className="h-screen flex justify-end">
      <div className="w-full flex items-center justify-center">
        <div
          className="bg-yellow-300 border-solid border-2 border-stone-500 container divide-y divide-x
        divide-stone-500 grid grid-cols-4 w-[40rem] h-[40rem]"
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={IDS[rowIndex * 4 + colIndex]}
                className="hover:cursor-pointer flex w-[10rem] h-[10rem] items-center justify-center"
              >
                {cell && <p>{cell.widgetIDs[0]}</p>}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="w-[40rem] flex flex-col items-center gap-4">
        <div className="bg-green-200 w-full h-96 px-2 py-1">
          <p className="text-center">List of Messages:</p>
          <ul className="overflow-y-scroll divide-y divide-stone-500 h-80">
            {messages.map((msg) => (
              <li key={msg.id}>
                <div className="flex mx-3 my-1 gap-4 justify-between">
                  <span>{msg.kind}</span>
                  <span>Priority: {msg.priority}</span>
                </div>
              </li>
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
