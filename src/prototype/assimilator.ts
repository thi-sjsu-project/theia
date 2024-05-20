import type { Widget, WidgetMap } from 'src/types/widget';
import type {
  Section,
  LinkedSectionWidget,
  WidgetCluster,
} from 'src/types/support-types';
import type { Message } from 'src/types/schema-types';
import { v4 as uuid } from 'uuid';

function doesOverlap(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number,
) {
  if (x1 + w1 < x2 || x2 + w2 < x1) {
    //if either widget is to the left of the other
    return false;
  }

  if (y1 + h1 < y2 || y2 + h2 < y1) {
    //if either widget is below the other
    return false;
  }

  return true; //since neither is to the left or under, they are overlapping
}


//tags1 should be the proposed widget, tags2 should be the tags in the message
function findSpecifierTag(tagsProposed:string[], tagsMessage:string[]){

  let specifier = 'none'
  //go through every tag in proposed widget and find the specified tag that links the messageTag to the widget tag
  tagsProposed.forEach((tagProposed) => {
    if(tagsMessage.includes(tagProposed)){
      //we found the specified tag that links them
      //find the specifier
      tagsMessage.forEach((tagMessage) =>{
        //if the tagMessage is not the same as the link tag, and it includes the link tag
        if(tagMessage !== tagProposed && tagMessage.includes(tagProposed)){
          //we found the specifier
          specifier = tagMessage;
        }
      });
    }
  });

  //there were no matching specifer tags
  return specifier;
}

type AssimilatorProps = {
  // define expected input here and it's type (number, string, etc.)
  possibleWidgetClusters: WidgetCluster[];
  sections: Section[];
  widgets: WidgetMap;
  message: Message;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const assimilator = ({
  possibleWidgetClusters,
  sections,
  widgets: deployedWidgets, // re-name for clarity
  message,
}: AssimilatorProps) => {
  let widgetClusterToDeploy: WidgetCluster = {
    widgets: [],
    sectionIds: [],
    actions: [],
  }; //will return null if we cannot find a space
  let index = -1;

  possibleWidgetClusters.forEach((widgetCluster, widgetClusterIndex) => {
    //go through every widget cluster
    let allWidgetsPlaced = true; //tracks if all widgets in this cluster have been placed

    //setup the cluster params we can deploy to
    const widgetsToDeploy: Widget[] = [];
    const sectionIdsToDeploy: LinkedSectionWidget[] = [];
    const actionsToDeploy: string[] = [];

    widgetCluster.widgets.forEach((widget, widgetIndex) => {
      //go through every widget in the current widget cluster
      // go through each possible widget until we find one we can place

      //find if the proposed widget already exists and if the already existing widget handles the message
      let widgetIdToUpdate = '';
      let widgetExists = false;
      let widgetHandlesMessage = false;
      
      //go through each deployed widget
      Object.keys(deployedWidgets).forEach((widgetId) => {
        if(widgetExists === false){ //make sure we haven't already found the widget
          const deployedWidget = deployedWidgets[widgetId];
          
          //find if the current deployedWidget is the same widget type as the proposed widget
          let sameWidget = true;
          widget.tags!.forEach((tag) => { //go through every tag in the proposed wigets tags
            if(!deployedWidget.tags!.includes(tag)){ //check if the tags are in the current deployed widget
              sameWidget = false; //the current tag was not in the current deployed widget, so it is not the same widget type
            }
          });
        
          if(sameWidget){ //the current deployed widget is the same widget type
            //find if they have the same tags and are the exact same widge instance
            let hasSameSpecifier = true;
            if(widget.tags!.includes('specify')){//if the proposed widget has 'specify', that means there could be multiple widget instances with the same widget type
              //go through every tag in the message and see if the current deployed widget has the same tags
              if(!deployedWidget.tags!.includes(findSpecifierTag(widget.tags!, message.tags!))){
                hasSameSpecifier = false;
              }
            }

            //if this deployed widget has the same specifier (or doesn't need them), then we found our widget
            if(hasSameSpecifier){
              widgetIdToUpdate = deployedWidget.id;
              widgetExists = true;
              //check if this deployed widget handles the message we are reacting to
              if(deployedWidget.handledMessageIds!.includes(message.id)){
                widgetHandlesMessage = true;
              }
            }
          }
        }
      });


      if (
        widgetExists &&
        widgetHandlesMessage
      ) {
        console.log('message handled by widget already')
        // check if the widget already exists on the screen and handles the message
        const sectionID = { widgetID: widgetIdToUpdate, sectionID: 'none' };
        const action = 'messageAlreadyHandled';
        widget.id = widgetIdToUpdate;
        const widgetToDeploy = widget;

        widgetsToDeploy.push(widgetToDeploy);
        actionsToDeploy.push(action);
        sectionIdsToDeploy.push(sectionID);
      } else if (
        widgetExists &&
        !widgetHandlesMessage
      ) {
        console.log('updating widget')
        // check if the widget already exists on the screen and that the widget does not handle the message
        const sectionID = { widgetID: widgetIdToUpdate, sectionID: 'none' };
        const action = 'updateWidget';
        widget.id = widgetIdToUpdate;
        const widgetToDeploy = widget;

        widgetsToDeploy.push(widgetToDeploy);
        actionsToDeploy.push(action);
        sectionIdsToDeploy.push(sectionID);
      } else {
        console.log('placing widget')
        //the widget doesn't exist yet

        let widgetPlaced = false; //tracks if we have placed this the widget

        //get the sections with matching types
        const matchingSections: Section[] = []; //holds matching sections
        sections.forEach(function (section, sectionIndex) {
          //find matching sections

          if (section.type === widget.sectionType) {
            matchingSections.push(section); //it matches, so add it
          }
        });

        matchingSections.forEach(function (section, sectionIndex) {
          //go through each section that matches our widget's

          //get the widgets in this section
          const matchingWidgets: Widget[] = [];
          section.widgetIDs.forEach(function (widgetID, widgetIDIndex) {
            Object.keys(deployedWidgets).forEach((widgetId) => {
              const deployedWidget = deployedWidgets[widgetId];

              if (
                deployedWidget.id === widgetID &&
                deployedWidget.canOverlap === false
              ) {
                // if the widget is in this section AND it cannot be opverlapped. if it can be overlapped then we can just place on top of it so we don't need to check.
                matchingWidgets.push(deployedWidget);
              }
            });
          });

          //set-up starting point of where to check for available space
          let startingX = section.x;
          let startingY = section.y;
          const { data } = message;

          // @ts-ignore
          const { missileLocation, target } = data;
          // account for missiles and targets
          if (missileLocation || target) {
            const { x: locationX, y: locationY } =
              missileLocation || target.location;

            // check if the location of the missile or target is within the section
            if (
              // @ts-ignore
              locationX >= section.x &&
              locationX + widget.w <= section.x + section.w && // @ts-ignore
              locationY >= section.y &&
              locationY + widget.h <= section.y + section.h
            ) {
              // @ts-ignore //use the coords given in message if they are within the section and could possibly house the widget
              startingX = locationX; // @ts-ignore
              startingY = locationY;
            }
          }
          for (let x = startingX; x < section.x + section.w - widget.w; x++) {
            //go through every x value in the section that could possibly house the widget (we subtract the size of the wdiget to ensure it doesn't get placed semi-outside of the section)
            // Used to be widget.y changed to widget.h - Paul
            for (let y = startingY; y < section.y + section.h - widget.h; y++) {
              //go through every y value in the section that could possibly house the widget (we subtract the size of the wdiget to ensure it doesn't get placed semi-outside of the section)
              if (!widgetPlaced) {
                //the widget has not been placed yet, we can still try to place it
                const proposedX = x; //the current x and y values that are proposed to be used as the top-left coordinates (can probably remove and change into x and y if we don't find more use for them later)
                const proposedY = y;

                let doesNotOverlap: boolean = true;

                matchingWidgets.forEach(
                  function (deployedWidget, deployedWidgetIndex) {
                    if (
                      doesNotOverlap === true &&
                      doesOverlap(
                        proposedX,
                        proposedY,
                        widget.w,
                        widget.h,
                        deployedWidget.x,
                        deployedWidget.y,
                        deployedWidget.w,
                        deployedWidget.h,
                      ) === true
                    ) {
                      //it did overlap, so set it to false
                      doesNotOverlap = false;
                    }
                  },
                );

                if (doesNotOverlap === true) {
                  widgetPlaced = true;
                  //no overlap, deploy widget
                  widget.id = uuid();
                  widget.x = proposedX; //set widget's top-left coordinates
                  widget.y = proposedY;
                  widget.handledMessageIds = [message.id]; //set widget's first message id
                  if(widget.tags!.includes('specify')){ //only add the specifier tag if the widget needs to be specified
                    widget.tags!.push(findSpecifierTag(widget.tags!, message.tags!))
                  }
                  const widgetToDeploy = widget; //the widget can be deployed
                  const sectionID = {
                    sectionID: section.id,
                    widgetID: widget.id,
                  };
                  const action = 'newWidget';

                  //push to widget cluster info
                  widgetsToDeploy.push(widgetToDeploy);
                  sectionIdsToDeploy.push(sectionID);
                  actionsToDeploy.push(action);
                }
              }
            }
          }
        });

        if (widgetPlaced === false) {
          // we couldn't place the widget, so all widgetsPlaced is false
          allWidgetsPlaced = false;
        }
      }
    });

    if (allWidgetsPlaced === true) {
      //all widgets in this cluster were placed, we can return the cluster
      widgetClusterToDeploy = {
        ...widgetClusterToDeploy,
        widgets: widgetsToDeploy,
        sectionIds: sectionIdsToDeploy,
        actions: actionsToDeploy,
      };
      index = widgetClusterIndex;
      return {
        widgetClusterToDeploy,
        index,
      };
    }
  });

  //got to end without finding any clusters to place
  return {
    widgetClusterToDeploy,
    index,
  };
};

export default assimilator;
