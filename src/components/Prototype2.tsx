/**
 * For April 12, 2024 Friday meeting
 *
 * TODOs:
 * Create grid
 * Moving ownship and drones
 * Integrate sockets
 * ...
 */

import { useAppSelector } from 'src/redux/hooks';
import { getGrid } from 'src/redux/slices/cmSlice';

// unique id for each cell in the grid
const IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Prototype2 = () => {
  const grid = useAppSelector(getGrid);

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="border-bottom border-right border-[2px] border-stone-400 
        container divide-y divide-x divide-stone-400 grid grid-cols-4 w-[40rem] h-[40rem]"
      >
        {grid.map((row, rowIndex) =>
          row.map((widget, colIndex) => (
            <div
              key={IDS[rowIndex * 4 + colIndex]}
              className="hover:cursor-pointer flex w-[10rem] h-[10rem] items-center justify-center"
            >
              {widget && <p>{widget.widgetIDs}</p>}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Prototype2;
