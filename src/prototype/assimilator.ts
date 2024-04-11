import type { Widget } from 'src/types/modalities';
import type { Cell } from 'src/types/support-types';

type AssimilatorProps = {
  // define expected input here and it's type (number, string, etc.)
  possibleWidgets: Widget[];
  pixelMap: Cell[][];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const assimilator = ({ possibleWidgets, pixelMap }: AssimilatorProps) => {
  let widgetToDeploy: Widget | null = null; //will return null if we cannot find a space
  pixelMap.forEach(function (row, rowIndex) {
    //go through each row
    row.forEach(function (cell, colIndex) {
      //go through each widget in row
      if (cell.widgetIDs.length === 0) {
        //found space to put the widget in
        widgetToDeploy = possibleWidgets[0]; //the widget can be deployed

        //check if the cell already contains a widget with the same ID as widgetToDeploy
        const existingWidgetIndex = cell.widgetIDs.findIndex(id => id === widgetToDeploy?.id);
        if (existingWidgetIndex !== -1) {
          console.log(`Updated widget ${widgetToDeploy.id} since it already exists.`);
          //update existing widget
          widgetToDeploy = null;
        } else {
          //widgetToDeploy.location = [rowIndex, colIndex]; //set the location of where it will be placed
        }
      }
    });
  });

  return {
    widgetToDeploy,
  };
};

export default assimilator;
