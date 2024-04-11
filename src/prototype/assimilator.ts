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

  let widgetToDeploy: Widget | null = null; //will return null if we cannot find a space

  possibleWidgets.forEach(function(widget, widgetIndex){//go through each possible widget until we find one we can place

    console.log("length sections "+sections.length);
    //get the sections with matching types
    const matchingSections: Section[] = []; //holds matching sections
    sections.forEach(function(section, sectionIndex) { //find matching sections
      
      if(section.type === widget.type) {
        matchingSections.push(section); //it matches, so add it
      }
    });

    console.log("matching sections"+matchingSections);
    console.log(matchingSections);

    matchingSections.forEach(function (section, sectionIndex) {//go through each section that matches our widget's
      for(let x = section.x; x < section.x+section.w; x++){ //go through every x value in the section
        for(let y = section.y; y < section.y+section.h; y++){ //go through every y value in the section

          if (pixelMap[x][y].widgetIDs.length === 0) { //this cell is empty, we may be able to start from here
            const proposedX = x; //the current x and y values that are proposed to be used as the top-left coordinates (can probably remove and change into x and y if we don't find more use for them later)
            const proposedY = y;


            let coinX = proposedX+1; //tracks right most x coordinate in the area we are checking
            while(coinX < (section.x+section.w)){ //go through the entire space until we hit the edge of the section
              if(pixelMap[coinX][y].widgetIDs.length === 0){ //check if this space is not taken yet

                let coinY = proposedY+1; //tracks right most y coordinate in the area we are checking
                while(coinY < (section.y+section.h)){ // go through the entire space until we hit the edge of the section
                  if(pixelMap[coinX][coinY].widgetIDs.length === 0){ //check if this space is not taken yet
                    if((coinY - proposedY) >= widget.h && (coinX - proposedX) >= widget.w){ //found space to put the widget in
                      widget.x = proposedX; //set widget's top-left coordinates
                      widget.y = proposedY;
                      widgetToDeploy = widget; //the widget can be deployed
                      return {
                        widgetToDeploy,
                      }
                    }
                  }
                  coinY++;
                }

                coinX++;
              } else {
                coinX = (section.x+section.w); //we have reached some sort of widget that will give us enough space from the proposedX or proposedY, so go to the next cell space and test from there
              }
            }
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
