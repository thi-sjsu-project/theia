import type { VideoWidget as VideoWidgetType } from 'src/types/widget';
import { useAppSelector } from 'src/redux/hooks';
import droneFootage from 'src/assets/DroneFootage_small.gif';
import defaultVideoScreen from 'src/assets/RequestVideoDefault.png';
import { useState, useEffect, useMemo } from 'react';
import { getVideoRequestConversationId } from 'src/redux/slices/communicationSlice';

type VideoWidgetProps = {
  widget: VideoWidgetType;
};

const VideoWidget = ({ widget }: VideoWidgetProps) => {
  const { x, y, h, w, elements } = widget;

  var gifImage = useMemo(() => new Image(), []);

  var defaultImage = useMemo(() => new Image(), []);

  const [img, changeImage] = useState(defaultImage);

  const videoRequestConversationId = useAppSelector(
    getVideoRequestConversationId,
  );

  useEffect(() => {
    if (!videoRequestConversationId) {
      defaultImage.src = defaultVideoScreen;
      changeImage(defaultImage);
      return;
    }
    gifImage.src = droneFootage;
    changeImage(gifImage);
  }, [videoRequestConversationId, defaultImage, gifImage]);

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
      <img src={img.src} alt="Drone Footage" />
    </div>
  );
};

export default VideoWidget;
