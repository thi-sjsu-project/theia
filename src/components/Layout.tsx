import { FaLocationArrow } from 'react-icons/fa';
import { GiDeliveryDrone } from 'react-icons/gi';
import GridLayout from 'react-grid-layout';
import type { Layout as LayoutType } from 'react-grid-layout';

const Layout = () => {
  const layout: LayoutType[] = [
    { i: 'a', x: 0, y: 0, w: 300, h: 1080, static: true },
    { i: 'drone1', x: 500, y: 200, w: 50, h: 50 },
    { i: 'drone2', x: 1500, y: 300, w: 50, h: 50 },
    { i: 'ownship', x: 800, y: 500, w: 50, h: 50 },
  ];

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
            key="a"
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
          <div key="ownship">
            <FaLocationArrow size={50} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default Layout;
