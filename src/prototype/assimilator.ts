import type { Widget } from 'src/types/modalities';

type AssimilatorProps = {
  // define expected input here and it's type (number, string, etc.)
  possibleWidgets: Widget[];
  grid: Widget[][];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const assimilator = ({ possibleWidgets, grid }: AssimilatorProps) => {
  let widgetToDeploy = null; //will return null if we cannot find a space
  grid.forEach(function (row, rowIndex) {
    //go through each row
    row.forEach(function (widget, colIndex) {
      //go through each widget in row
      if (widget === null) {
        //found space to put the widget in
        widgetToDeploy = possibleWidgets[0]; //the widget can be deployed
        widgetToDeploy.location = [rowIndex, colIndex]; //set the location of where it will be placed
      }
    });
  });

  return {
    widgetToDeploy,
  };
};

export default assimilator;
