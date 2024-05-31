import type {VideoWidget as VideoWidgetType } from 'src/types/widget';
import { useAppSelector } from 'src/redux/hooks';
import droneFootage from 'src/assets/DroneFootage_small.gif';
import defaultVideoScreen from 'src/assets/RequestVideoDefault.png';
import {getElementsInGaze, getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import { useState, useEffect } from 'react';
import { getAllElements } from 'src/redux/slices/minimapSlice';
import { getActiveConversationId } from 'src/redux/slices/communicationSlice';

type VideoWidgetProps = {
  widget: VideoWidgetType;
};

const VideoWidget = ({ widget }: VideoWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  
  
  
  var gifImage = new Image();
  gifImage.src = droneFootage;

  var defaultImage = new Image();
  defaultImage.src = defaultVideoScreen;
  const[img, changeImage] = useState(defaultImage);
  

  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const allElements = useAppSelector(getAllElements);

  const selectedMessage = useAppSelector(getActiveConversationId);

  useEffect(() => {
    changeImage(defaultImage);
  }, [selectedMessage]);

  useEffect(() => {
    for(let gk of gazesAndKeys){
      if(gk.keyPress === "1"){
        for(let element of allElements){
            if(element === undefined || gk.elemsInGaze[0] === undefined){
                // changeImage(defaultImage);
                break;
            }
            if(element.id == gk.elemsInGaze[0].id && element.type == 'information'){
            changeImage(gifImage);
            }
        }
      }
    }
  }, [gazesAndKeys]);

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

export default VideoWidget;
