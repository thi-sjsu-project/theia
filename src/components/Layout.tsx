import GridLayout from 'react-grid-layout';
import type { Layout as LayoutType } from 'react-grid-layout';
import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { GiDeliveryDrone } from 'react-icons/gi';
import { OWNSHIP_TRAJECTORY } from 'src/utils/constants';

const Layout = () => {
  const bounds = {
    left: 400,
    right: 1920,
    top: 1080,
    bottom: 50,
  };
  const droneMove = {
    x: 10,
    y: 0,
  };

  const [layout, setLayout] = useState<LayoutType[]>([
    { i: 'tinder', x: 0, y: 0, w: 300, h: 1080, static: true },
    { i: 'drone1', x: 500, y: 200, w: 50, h: 50 },
    { i: 'drone2', x: 1500, y: 300, w: 50, h: 50 },
    { i: 'drone3', x: 1200, y: 700, w: 50, h: 50 },
    { i: 'ownship', x: 400, y: 950, w: 50, h: 50, isDraggable: true },
  ]);

  useEffect(() => {
    // update ownship position every 500ms (0.5s)
    const timer = setInterval(() => {
      setLayout((prevLayout) =>
        prevLayout.map((item) => {
          if (item.i === 'ownship') {
            if (
              item.x + OWNSHIP_TRAJECTORY.xSpeed <= OWNSHIP_TRAJECTORY.end[0] &&
              item.y - OWNSHIP_TRAJECTORY.ySpeed >= OWNSHIP_TRAJECTORY.end[1]
            ) {
              // only move ownship if within defined trajectory boundss\
              return {
                ...item,
                x: item.x + OWNSHIP_TRAJECTORY.xSpeed,
                y: item.y - OWNSHIP_TRAJECTORY.ySpeed,
              };
            }
            return item;
          }
          return item;
        }),
      );
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // random drone movement every second
    const timer = setInterval(() => {
      setLayout((prevLayout) =>
        prevLayout.map((item) => {
          if (item.i.includes('drone')) {
            droneMove.x = Math.floor(Math.random() * 20) - 10;
            droneMove.y = Math.floor(Math.random() * 20) - 10;
            if (
              item.x + droneMove.x < bounds.left ||
              item.x + droneMove.x > bounds.right
            ) {
              droneMove.x = -droneMove.x;
            }
            if (
              item.y + droneMove.y < bounds.bottom ||
              item.y + droneMove.y > bounds.top
            ) {
              droneMove.y = -droneMove.y;
            }

            return {
              ...item,
              x: item.x + droneMove.x,
              y: item.y + droneMove.y,
            };
          }
          return item;
        }),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-red-300 w-[1920px] h-[1080px] hover:cursor-pointer">
        <GridLayout
          cols={1920}
          width={1920}
          layout={layout}
          rowHeight={1}
          margin={[0, 0]}
          isBounded={true}
          isResizable={false}
          compactType={null}
          allowOverlap={true}
          preventCollision={true}
        >
          <div
            key="tinder"
            className="bg-blue-300 flex 
            items-center justify-center "
          >
            <p className="text-5xl">Tinder Box</p>
          </div>
          <div key="drone1">
            <GiDeliveryDrone size={50} />
          </div>
          <div key="drone2">
            <GiDeliveryDrone size={50} />
          </div>
          <div key="drone3">
            <GiDeliveryDrone size={50} />
          </div>
          <div key="ownship">
            <FaLocationArrow size={50} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default Layout;
