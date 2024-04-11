import { FaLocationArrow } from 'react-icons/fa';
import { GiDeliveryDrone } from 'react-icons/gi';
import GridLayout from 'react-grid-layout';
import type { Layout as LayoutType } from 'react-grid-layout';
import { useEffect, useRef, useState } from 'react';

const Layout = () => {
  const [xTravel, setXTravel] = useState(0);
  const ownshipRef = useRef<HTMLDivElement>(null);
  const bound  = {
    left: 300,
    right: 1930,
    top: 1080,
    bottom: 50,
  }

  let yTravel = 0;
  const move = {
    x: 50,
    y: 0,
  };

  const [layout, setLayout] = useState<LayoutType[]>([
    { i: 'tinder', x: 0, y: 0, w: 300, h: 1080, static: true },
    { i: 'drone1', x: 500, y: 200, w: 50, h: 50 },
    { i: 'drone2', x: 1500, y: 300, w: 50, h: 50 },
    { i: 'drone3', x: 1200, y: 700, w: 50, h: 50 },
    { i: 'ownship', x: 400, y: 950, w: 50, h: 50, isDraggable: true },
  ]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setLayout((prevLayout) =>
  //       prevLayout.map((item) => {
  //         if (item.i === 'ownship') {
  //           if (item.x === 1850) {
  //             move.x = 0;
  //             move.y = 50;
  //           } else if (item.x === 400) {
  //             move.x = 0;
  //             move.y = -50;
  //           }
  //           return { ...item, x: item.x + move.x, y: item.y + move.y };
  //         }
  //         return item;
  //       }),
  //     );
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLayout((prevLayout) =>
        prevLayout.map((item) => {
          if (item.i.includes('drone')) {
            move.x = Math.floor(Math.random() * 100) - 50;
            move.y = Math.floor(Math.random() * 100) - 50;
            if (item.x + move.x < bound.left || item.x + move.x > bound.right) {
              move.x = -move.x;
            }
            if (item.y + move.y < bound.bottom || item.y + move.y > bound.top) {
              move.y = -move.y;
            }

            return { ...item, x: item.x + move.x, y: item.y + move.y };
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
          <div ref={ownshipRef} key="ownship">
            <FaLocationArrow size={50} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default Layout;
