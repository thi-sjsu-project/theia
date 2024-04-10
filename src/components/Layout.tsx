import GridLayout from 'react-grid-layout';
import type { Layout as LayoutType } from 'react-grid-layout';

const Layout = () => {
  const layout: LayoutType[] = [
    { i: 'a', x: 0, y: 0, w: 3, h: 1080, static: true },
    { i: 'b', x: 4, y: 0, w: 3, h: 50, minW: 2, maxW: 4 },
    { i: 'c', x: 7, y: 300, w: 1, h: 80 },
    { i: 'd', x: 4, y: 500, w: 1, h: 80 },
  ];

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-red-300 w-[1920px] h-[1080px]">
        <GridLayout
          cols={12}
          layout={layout}
          rowHeight={1}
          width={1920}
          margin={[0, 0]}
          autoSize={true}
          compactType={null}
        >
          <div
            key="a"
            className="bg-blue-300 flex 
            items-center justify-center"
          >
            <p className="text-5xl">Tinder Box</p>
          </div>
          <div key="b" className="bg-green-300">
            I DONT KNOW WHAT TO PUT HERE...
          </div>
          <div
            key="c"
            className="bg-blue-500 flex 
            items-center justify-center"
          >
            Message...
          </div>
          <div
            key="d"
            className="bg-red-500 flex 
            items-center justify-center"
          >
            DANGER!!!
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default Layout;
