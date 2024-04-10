/**
 * For April 12, 2024 Friday meeting
 *
 * TODOs:
 * Create grid
 * Moving ownship and drones
 * Integrate sockets
 * ...
 */
import {
  addWidget,
  initializeGrid
} from 'src/redux/slices/cmSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getGrid } from 'src/redux/slices/cmSlice';
import type { Widget, Element } from 'src/types/modalities';

// unique id for each cell in the grid
const IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Prototype2 = () => {
  const dispatch = useAppDispatch();
  dispatch(initializeGrid());
  const grid = useAppSelector(getGrid);

  const topHalf: Element = {
    id: "topHalf",
    modality: "visual",
    type: "text",
    locationWidget: [[10,0],[40,24]],
    
  }
  const bottomHalf: Element = {
    id: "bottomHalf",
    modality: "visual",
    type: "text",
    locationWidget: [[10,25],[40,50]],
    
  }
  const widget: Widget = {
      id: "tinder",
      elements: [topHalf,bottomHalf],
      type: "tinder",
      maxAmount: 1,
      size: [50,50],
      locationGrid: [[100,200], [150,250]],
      useElementLocation: false,
      canOverlap: false,
    };
    
    dispatch(addWidget(widget));
  

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="border-bottom border-right border-[2px] border-stone-400 
        container divide-y divide-x divide-stone-400 grid grid-cols-4 w-[40rem] h-[40rem]"
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={IDS[rowIndex * 4 + colIndex]}
              className="hover:cursor-pointer flex w-[10rem] h-[10rem] items-center justify-center"
            >
              {cell && <p>{cell.widgetIDs}</p>}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Prototype2;
