import { useEffect, useState } from 'react';
import { useMousePosition } from 'src/hooks/useMousePosition';
import type { Position } from 'src/hooks/useMousePosition';
import type { AppDispatch } from 'src/redux/store';
import type { Widget } from 'src/types/modalities';


export type ElementInGaze = {
    id: string;
    widgetId: string;
}
//turn element pixel locations into full locations within screen
function elemLocToPixLoc(eX: number, eY:number, wX:number, wY:number){
    const position: Position = {
        x: wX+eX,
        y: wY+eY
    }
    return position;
}


export function findElementsInGaze(mousePosition: Position, dispatch: AppDispatch, widgets: Widget[], radius: number, inCirclePercentageThresh: number, elementPercentageThesh: number) {


    
    const elemsInGaze: ElementInGaze[] = [];
 
    //detect overlaps and select the one with higher priority
        const distance = (x0: number, y0: number, x1: number, y1: number) => Math.hypot(x1 - x0, y1 - y0); //euclidean distance
        

        const widgetsInGaze: Widget[] = [];
        widgets.forEach(function (widget, widgetIndex) { //find the widgets that are within our circle
            let isIn = false;
            for(let x = widget.x; x < widget.x+widget.w; x++){ //find the number of pixels within the element that are in the gaze circle
                if(!isIn){
                    for(let y = widget.y; y < widget.y+widget.h; y++){
                        if(distance(x,y,mousePosition.x,mousePosition.y) < radius){
                            widgetsInGaze.push(widget)
                            isIn = true;
                            console.log("isin!")
                            break;
                        }
                    }
                }
            }
            // const topLeft: Position = {x:widget.x, y:widget.y};
            // const topRight: Position = {x:widget.x+widget.w, y:widget.y};
            // const bottomLeft: Position = {x:widget.x, y:widget.y+widget.h};
            // const bottomRight: Position = {x:widget.x+widget.w, y:widget.y+widget.h};
            // //check if the widget is within the radius of the mouse pointer
            // if(
            // distance(mousePosition.x,mousePosition.y, topLeft.x, topLeft.y) < radius
            // || distance(mousePosition.x,mousePosition.y, topRight.x, topRight.y) < radius
            // || distance(mousePosition.x,mousePosition.y, bottomLeft.x, bottomLeft.y) < radius
            // || distance(mousePosition.x,mousePosition.y, bottomRight.x, bottomRight.y) < radius
            // ){
            //     widgetsInGaze.push(widget)
            // }
        });

        if(widgetsInGaze.length > 0){
            //console.log("widgets in gaze:", widgetsInGaze)
        }

        widgetsInGaze.forEach(function(widget, widgetIndex){
            widget.elements.forEach(function(element, elementIndex){
                const elementPos: Position = elemLocToPixLoc(element.xWidget, element.yWidget, widget.x, widget.y);
                let numElemPixInCircle: number = 0;
                for(let x = elementPos.x; x < elementPos.x+element.w; x++){ //find the number of pixels within the element that are in the gaze circle
                    for(let y = elementPos.y; y < elementPos.y+element.h; y++){
                        if(distance(x,y,mousePosition.x,mousePosition.y) < radius){
                            numElemPixInCircle++;
                        }
                    }
                }

                const numPixInElem: number = element.w*element.h; //number of total pixels that element takes up
                const numPixInCircle: number = Math.PI*Math.pow(radius, 2) //number of total pixels that the circle has
                
                
                const percentOfElemInCircle = numElemPixInCircle/numPixInElem; //percentage of the element that is currently within the gaze circle
                const percentOfCircleFilledByElem = numElemPixInCircle/numPixInCircle; //percentage of the gaze circle is taken up by this element
                //console.log("percent of elem in circle: "+ percentOfElemInCircle);
                //console.log("percent of circle filled by elem: "+ percentOfCircleFilledByElem);

                if(percentOfElemInCircle > elementPercentageThesh || percentOfCircleFilledByElem > inCirclePercentageThresh){
                    elemsInGaze.push({id: element.id, widgetId: widget.id});
                }

                
            });
        });
        

  return elemsInGaze;
}