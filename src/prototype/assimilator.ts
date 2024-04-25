import type { Widget } from 'src/types/modalities';
import type { Section, LinkedSectionWidget } from 'src/types/support-types';


function doesOverlap(x1:number,y1:number,w1:number,h1:number,x2:number,y2:number,w2:number,h2:number){
  if(x1+w1 < x2 || x2+w2 < x1){ //if either widget is to the left of the other
    return false;
  }

  if(y1+h1 < y2 || y2+h2 < y1){ //if either widget is below the other
    return false;
  }

  return true; //since neither is to the left or under, they are overlapping
}
type AssimilatorProps = {
  // define expected input here and it's type (number, string, etc.)
  possibleWidgets: Widget[];
  sections: Section[];
  widgets: Widget[];
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const assimilator = ({ possibleWidgets, sections, widgets }: AssimilatorProps) => {

  let widgetToDeploy: Widget | null = null; //will return null if we cannot find a space
  let sectionID: LinkedSectionWidget = {widgetID:'none', sectionID:'none'};

  possibleWidgets.forEach(function(widget, widgetIndex){//go through each possible widget until we find one we can place

    //get the sections with matching types
    const matchingSections: Section[] = []; //holds matching sections
    sections.forEach(function(section, sectionIndex) { //find matching sections
      
      if(section.type === widget.type) {
        matchingSections.push(section); //it matches, so add it
      }
    });

    
    matchingSections.forEach(function (section, sectionIndex) {//go through each section that matches our widget's
      
      //get the widgets in this section
      const matchingWidgets: Widget[] = [];
      section.widgetIDs.forEach(function(widgetID, widgetIDIndex){//get the widgets in this section
        widgets.forEach(function(deployedWidget, deployedWidgetIndex){
          if(deployedWidget.id === widgetID && deployedWidget.canOverlap === false){ //if the widget is in this section AND it cannot be opverlapped. if it can be overlapped then we can just place on top of it so we don't need to check.
            matchingWidgets.push(deployedWidget);
          }
        });
      });

      
      for(let x = section.x; x < section.x+section.w-widget.w; x++){ //go through every x value in the section that could possibly house the widget (we subtract the size of the wdiget to ensure it doesn't get placed semi-outside of the section)
        for(let y = section.y; y < section.y+section.h-widget.y; y++){ //go through every y value in the section that could possibly house the widget (we subtract the size of the wdiget to ensure it doesn't get placed semi-outside of the section)
          const proposedX = x; //the current x and y values that are proposed to be used as the top-left coordinates (can probably remove and change into x and y if we don't find more use for them later)
          const proposedY = y;

          let doesNotOverlap:boolean = true;

          matchingWidgets.forEach(function(deployedWidget, deployedWidgetIndex){
            if (doesNotOverlap == true && doesOverlap(proposedX,proposedY,widget.w,widget.h, deployedWidget.x, deployedWidget.y, deployedWidget.w, deployedWidget.h) == true){ //it did overlap, so set it to false
              doesNotOverlap = false;
            }
          });

          if (doesNotOverlap == true){ //no overlap, deploy widget
            widget.x = proposedX; //set widget's top-left coordinates
            widget.y = proposedY;
            widgetToDeploy = widget; //the widget can be deployed
            sectionID = {sectionID: section.id, widgetID:widget.id};
            return {
              widgetToDeploy,
              sectionID
            }
          }
        }
        
      }
    });
  });

  return {
    widgetToDeploy,
    sectionID
  };
};

export default assimilator;
