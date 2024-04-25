import type { Widget as WidgetType } from 'src/types/widget';
import type { Element as ElementType, IconElement } from 'src/types/element';
import { v4 as uuid } from 'uuid';
import ownshipLogo from 'src/icons/currentPosition.svg';
import Widget from 'src/components/Widget';
import Element from 'src/components/Element';
import droneLogo from 'src/icons/drone.svg';
import { OWNSHIP_TRAJECTORY } from 'src/utils/constants';
import { useEffect, useState } from 'react';

type LayoutProps = {
  widgets: WidgetType[];
};

const ownshipElement: IconElement = {
  id: uuid(),
  modality: 'visual',
  type: 'icon',
  src: ownshipLogo,

  h: 50,
  w: 50,

  xWidget: 0,
  yWidget: 0,
};

const initialOwnshipWidget: WidgetType = {
  id: uuid(),

  x: 400,
  y: 950,
  w: 50,
  h: 50,

  type: 'vehicle',
  elements: [ownshipElement],

  styles: {},

  canOverlap: false,
  useElementLocation: false,
  maxElements: 1,
};

const droneElement: IconElement = {
  id: uuid(),
  modality: 'visual',
  type: 'icon',
  src: droneLogo,

  h: 50,
  w: 50,

  xWidget: 0,
  yWidget: 0,
};

const createDroneWidget = (x: number, y: number, w: number, h: number): WidgetType => ({
  elements: [droneElement],
  id: uuid(),
  type: 'vehicle',

  x,
  y,
  w,
  h,

  styles: {},

  canOverlap: false,
  useElementLocation: false,
  maxElements: 5,
});

const initialDroneWidgets = [
  createDroneWidget(500, 200, 50, 50),
  createDroneWidget(1500, 550, 50, 50),
  createDroneWidget(1500, 350, 50, 50),
  createDroneWidget(200, 900, 50, 50),
  createDroneWidget(1150, 750, 50, 50),
];

const Minimap = ({ widgets }: LayoutProps) => {
  const [ownshipWidget, setOwnshipWidget] = useState(initialOwnshipWidget);
  const [droneWidgets, setDroneWidgets] = useState(initialDroneWidgets);

  useEffect(() => {
    // update ownship position every 500ms (0.5s)
    const timer = setInterval(() => {
      if (
        ownshipWidget.x + OWNSHIP_TRAJECTORY.xSpeed <=
          OWNSHIP_TRAJECTORY.end[0] &&
        ownshipWidget.y - OWNSHIP_TRAJECTORY.ySpeed >= OWNSHIP_TRAJECTORY.end[1]
      ) {
        // only move ownship if within defined trajectory bounds
        setOwnshipWidget(prevOwnship => ({
          ...prevOwnship,
          x: prevOwnship.x + OWNSHIP_TRAJECTORY.xSpeed,
          y: prevOwnship.y - OWNSHIP_TRAJECTORY.ySpeed,
        }));
      }
      return ownshipWidget;
    }, 500);

    return () => clearInterval(timer);
  }, [ownshipWidget]);

  useEffect(() => {
    // random drone movement every second
    const timer = setInterval(() => {
      const bounds = {
        left: 400,
        right: 1920,
        top: 1080,
        bottom: 50,
      };
      const droneMove = {
        x: 5,
        y: 0,
      };

      setDroneWidgets((prevDroneWidgets) =>
        prevDroneWidgets.map((droneWidget) => {
          droneMove.x = Math.floor(Math.random() * 10) - 5;
          droneMove.y = Math.floor(Math.random() * 10) - 5;

          // only move drone if within defined bounds
          if (
            droneWidget.x + droneMove.x < bounds.left ||
            droneWidget.x + droneMove.x > bounds.right
          ) {
            droneMove.x = -droneMove.x;
          }
          if (
            droneWidget.y + droneMove.y < bounds.bottom ||
            droneWidget.y + droneMove.y > bounds.top
          ) {
            droneMove.y = -droneMove.y;
          }

          return {
            ...droneWidget,
            x: droneWidget.x + droneMove.x,
            y: droneWidget.y + droneMove.y,
          };
        })
      );
    }, 1500);

    return () => clearInterval(timer);
  }, [droneWidgets]);

  return (
    <div className="absolute top-0 left-0 bg-stone-300 w-[1920px] h-[1080px] hover:cursor-pointer">
      <Widget widget={ownshipWidget}>
        {ownshipWidget.elements.map((element) => (
          <Element key={element.id} element={element} />
        ))}
      </Widget>

      {droneWidgets.map((droneWidget) => (
        <Widget widget={droneWidget} key={droneWidget.id}>
          {droneWidget.elements.map((element) => (
            <Element key={element.id} element={element} />
          ))}
        </Widget>
      ))}
    </div>
  );
};

export default Minimap;
