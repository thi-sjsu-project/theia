import type { ACAProps } from '../../components/Widget/ACA';
import ACA from '../../components/Widget/ACA';
import type { FC } from 'react';



interface ACAHeaderProps {
    data: ACAProps[];
}

const ACAHeader: FC<ACAHeaderProps> = ({ data }) => {
    return (
        <div style={{ backgroundColor: '#1E1E1E', margin: '0 auto', padding: '20px', maxHeight: '130px'}}>
            <div className="flex flex-wrap space-x-4 h-72">
                {data.map((item, index) => (
                    <div key={index} style={{ paddingBottom: '1rem', paddingLeft: index !== 0 && (index + 1) % 5 === 0 ? '235px' : '0px' }}>
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
}

export default ACAHeader;
