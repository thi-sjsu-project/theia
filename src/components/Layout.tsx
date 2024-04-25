import GridLayout from 'react-grid-layout';
import type { Layout as LayoutType } from 'react-grid-layout';
import { useEffect, useRef, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { GiDeliveryDrone } from 'react-icons/gi';
import { OWNSHIP_TRAJECTORY } from 'src/utils/constants';
import type { Widget } from 'src/types/modalities';

type LayoutProps = {
  widgets: Widget[];
};

const Layout = ({ widgets }: LayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState<LayoutType[]>([
    /* { i: 'tinder', x: 0, y: 0, w: 300, h: 1080, static: true }, */
    { i: 'drone1', x: 500, y: 200, w: 50, h: 50 },
    { i: 'drone2', x: 1500, y: 550, w: 50, h: 50 },
    { i: 'drone4', x: 1500, y: 350, w: 50, h: 50 },
    { i: 'drone5', x: 200, y: 900, w: 50, h: 50 },
    { i: 'drone3', x: 1150, y: 750, w: 50, h: 50 },
    { i: 'ownship', x: 400, y: 950, w: 50, h: 50, isDraggable: true },
  ]);

  useEffect(() => {
    if (widgets.length > 0) {
      const { id: widgetId, type, x, y, w, h, style } = widgets[widgets.length - 1];

      setLayout((prevLayout) => {
        // if widgetId is in layout, return layout as is
        if (prevLayout.some((item) => item.i === widgetId)) {
          return prevLayout;
        }

        // add new widget to widgetMap
        const div = document.createElement('div');
        div.id = widgetId;
        // div.style.position = 'absolute';
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = `${w}px`;
        div.style.height = `${h}px`;
        // div.style.opacity = '0.5';
        // div.style.border = 'solid';

        // let bgColor = 'red';

        // if (type === 'tinder') {
        //   bgColor = 'green';
        // }

        // if (type === 'message') {
        //   bgColor = 'blue';
        // }

        // if (type === 'lowWarning') {
        //   bgColor = 'orange';
        // }

        // div.style.backgroundColor = bgColor;
        // div.style.zIndex = '100';

        // For each property in style, set the div style property
        for (const property in style as any) {
          // Have to use "keyof typeof style" because of the way style is typed or else ts7053 error
          // Null check because style can be undefined
          console.log(`${property}: ${style! [property as keyof typeof style]}`);
          div.style[property as keyof typeof style] = style! [property as keyof typeof style];
        };
        console.log(div.style);
        layoutRef.current?.appendChild(div);

        // if widgetId is not in layout, add widget to layout
        return [
          ...prevLayout,
          {
            i: widgetId,
            x,
            y,
            w,
            h,
          },
        ];
      });
    }
  }, [widgets]);

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
              // only move ownship if within defined trajectory bounds
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

      setLayout((prevLayout) =>
        prevLayout.map((item) => {
          if (item.i.includes('drone')) {
            droneMove.x = Math.floor(Math.random() * 10) - 5;
            droneMove.y = Math.floor(Math.random() * 10) - 5;

            // only move drone if within defined bounds
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

          // if not drone, return item without changes
          return item;
        }),
      );
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 bg-stone-300 w-[1920px] h-[1080px] hover:cursor-pointer">
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
        innerRef={layoutRef}
      >
        <div key="drone1">
          <GiDeliveryDrone size={50} />
        </div>
        <div key="drone2">
          <GiDeliveryDrone size={50} />
        </div>
        <div key="drone3">
          <GiDeliveryDrone size={50} />
        </div>
        <div key="drone4">
          <GiDeliveryDrone size={50} />
        </div>
        <div key="drone5">
          <GiDeliveryDrone size={50} />
        </div>
        <div key="ownship">
          <FaLocationArrow size={50} />
        </div>
      </GridLayout>
    </div>
  );
};

export default Layout;