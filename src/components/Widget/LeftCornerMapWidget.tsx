import type {LeftCornerMapWidget as LeftCornerMapWidgetType } from 'src/types/widget';
import { useAppSelector } from 'src/redux/hooks';
import droneFootage from 'src/assets/DroneFootage_small.gif';
import defaultVideoScreen from 'src/assets/RequestVideoDefault.png';
import leftMapZero from 'src/assets/pearce-maps/left_map_0.png';
import leftMapOne from 'src/assets/pearce-maps/left_map_1.png';
import leftMapTwo from 'src/assets/pearce-maps/left_map_2.png';
import leftMapThree from 'src/assets/pearce-maps/left_map_3.png';
import leftMapFour from 'src/assets/pearce-maps/left_map_4.png';
import leftMapFive from 'src/assets/pearce-maps/left_map_5.png';
import leftMapSix from 'src/assets/pearce-maps/left_map_6.png';
import leftMapSeven from 'src/assets/pearce-maps/left_map_7.png';
import leftMapEight from 'src/assets/pearce-maps/left_map_8.png';
import leftMapNine from 'src/assets/pearce-maps/left_map_9.png';
import leftMapTen from 'src/assets/pearce-maps/left_map_10.png';
import leftMapEleven from 'src/assets/pearce-maps/left_map_11.png';
import blankMap from 'src/assets/pearce-maps/left_map_blank.png';

import {getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import { useState, useEffect } from 'react';
import { getAllElements } from 'src/redux/slices/minimapSlice';
import { getActiveConversationId, getCommunication } from 'src/redux/slices/communicationSlice';

type LeftCornerMapWidgetProps = {
  widget: LeftCornerMapWidgetType;
};

const LeftCornerMapWidget = ({ widget }: LeftCornerMapWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  
  
  
  var gifImage = new Image();
  gifImage.src = droneFootage;

  var defaultImage = new Image();
  defaultImage.src = blankMap;

  const[img, changeImage] = useState(defaultImage);

  

  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const allElements = useAppSelector(getAllElements);
//   const {activeElementId, activeConversationId} = useAppSelector(getCommunication);

  const selectedMessage = useAppSelector(getActiveConversationId);
//   const selectedElement = useState<Element>();

  useEffect(() => {

    if(selectedMessage === undefined || selectedMessage === ""){
    return;
    }


    let randomValue = Math.floor(Math.random() * 12);
    console.log(randomValue);

    switch(randomValue){
        case 0:
            img.src = leftMapZero
            break;
        case 1:
            img.src = leftMapOne
            break;
        case 2:
            img.src = leftMapTwo
            break;
        case 3:
            img.src = leftMapThree
            break;
        case 4:
            img.src = leftMapFour
            break;
        case 5:
            img.src = leftMapFive
            break;
        case 6:
            img.src = leftMapSix
            break;
        case 7:
            img.src = leftMapSeven
            break;
        case 8:
            img.src = leftMapEight
            break;
        case 9:
            img.src = leftMapNine
            break;
        case 10:
            img.src = leftMapTen
            break;
        case 11:
            img.src = leftMapEleven
            break;
        default:
            img.src = defaultVideoScreen
            break;
    }



    
    changeImage(img);
    
  }, [selectedMessage]);

  return (
    <div
      style={{
        top: y,
        left: x,
        width: w,
        height: h,
      }}
      className="absolute bg-[#252526] flex gap-4 px-4 py-2"
    >
        <img src = {img.src} alt = "Drone Footage"/>
    </div>
  );
};

export default LeftCornerMapWidget;
