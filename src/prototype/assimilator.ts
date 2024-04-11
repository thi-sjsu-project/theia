import type { Widget } from 'src/types/modalities';
import type { Cell, Section } from 'src/types/support-types';

type AssimilatorProps = {
  // define expected input here and it's type (number, string, etc.)
  possibleWidgets: Widget[];
  pixelMap: Cell[][];
  sections: Section[];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const assimilator = ({ possibleWidgets, pixelMap, sections }: AssimilatorProps) => {

  let widgetToDeploy = null; //will return null if we cannot find a space

  possibleWidgets.forEach(function(widget, widgetIndex){//go through each possible widget until we find one we can place

  
    //get the sections with matching types
    const matchingSections: Section[] = []; //holds matching sections
    sections.forEach(function(section, sectionIndex) { //find matching sections
      if(section.type == widget.type) {
        matchingSections.push(section); //it matches, so add it
      }
    });

    matchingSections.forEach(function (section, sectionIndex) {
      //go through each row
      for(let x = section.x; x < section.x+section.w; x++){
        for(let y = section.y; y < section.y+section.h; y++){

          const widgetsInCell = pixelMap[x][y].widgetIDs;
          if (widgetsInCell.length === 0) { //this cell is empty, we may be able to start from here
            const proposedX = x;
            const proposedY = y;

            for 
            //found space to put the widget in
            widgetToDeploy = possibleWidgets[0]; //the widget can be deployed
            return {
              widgetToDeploy,
            }
            //widgetToDeploy.location = [rowIndex, colIndex]; //set the location of where it will be placed
          }
        }
      }
    });
  });

  return {
    widgetToDeploy,
  };
};

export default assimilator;
