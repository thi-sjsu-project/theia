import type { ACAProps } from '../../ui/ACA';
import ACA from '../../ui/ACA';
import type { FC } from 'react';

interface ACAHeaderProps {
  data: ACAProps[];
}

const ACAHeader: FC<ACAHeaderProps> = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        margin: '0 auto',
        padding: '20px',
        maxHeight: '130px',
      }}
    >
      <div className="flex flex-wrap space-x-4 h-72">
        {data.map((item, index) => (
          <div key={index} style={{ paddingBottom: '1rem' }}>
            <ACA
              key={index}
              title={item.title}
              ammoLeft={item.ammoLeft}
              ammoRight={item.ammoRight}
              fuelAmount={item.fuelAmount}
              circleColor={item.circleColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ACAHeader;
