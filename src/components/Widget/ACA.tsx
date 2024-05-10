import React from 'react';
import type { FC } from 'react';
import usedBullet from 'src/assets/used.png';
import unusedBullet from 'src/assets/unused.png';

export interface ACAProps {
  title: string;
  ammoLeft: ('Used' | 'Unused')[];
  ammoRight: ('Used' | 'Unused')[];
  fuelAmount: number;
  circleColor: 'blue' | 'yellow';
}

const ACA: FC<ACAProps> = ({ title, ammoLeft, ammoRight, fuelAmount, circleColor}) => {
  const getFuelColor = (fuelAmount: number) => {
    if (fuelAmount < 20) {
      return 'bg-red-500';
    }
    return 'bg-gray-300';
  };

  const getBulletImage = (status: 'Used' | 'Unused') => {
    return status === 'Used' ? usedBullet : unusedBullet;
  };

  const circleClass = circleColor === 'blue' ? 'bg-blue-500' : 'bg-yellow-500';


  return (
    <div style ={{width: '132x', height: '98px', backgroundColor: '#2D2D30'}} className="bg-gray-800 rounded-lg p-2 flex flex-col justify-between relative">
      <div className="flex items-center mb-2">
       <div className={`w-2 h-2 rounded-full ${circleClass} mr-2`}></div>
        <span className="text-white text-lg font-bold">{title}</span>
      </div>
      <div className="flex justify-between w-full mb-2 space-x-4">
        <div className="flex">
          {ammoLeft.map((bullet, index) => (
            <img
              key={index}
              src={getBulletImage(bullet)}
              alt={bullet}
              className="w-4 h-10 mx-0.5"
            />
          ))}
        </div>
        <div className="flex">
          {ammoRight.map((bullet, index) => (
            <img
              key={index}
              src={getBulletImage(bullet)}
              alt={bullet}
              className="w-4 h-10 mx-0.5"
            />
          ))}
        </div>
      </div>
      <div className="w-full flex items-center h-6">
  <div className="h-1.5 w-full bg-gray-500 rounded-full">
    <div
      className={`h-1.5 ${getFuelColor(fuelAmount)} rounded-full`}
      style={{ width: `${fuelAmount}%` }}
    ></div>
  </div>
</div>
    </div>
  );
};

export default ACA;
