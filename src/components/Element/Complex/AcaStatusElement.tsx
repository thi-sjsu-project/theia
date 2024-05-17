import { type AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import UsedBulletLeft from 'src/assets/used.png';
import UnusedBulletLeft from 'src/assets/unused.png';
import UnusedBulletRight from 'src/assets/unused_right.png';
import UsedBulletRight from 'src/assets/used_right.png';
import { useAppDispatch } from 'src/redux/hooks';
import { useEffect } from 'react';
import { updateDroneFuelLevel } from 'src/redux/slices/minimapSlice';

type PropsType = {
  element: AcaStatusElementType;
};

const AcaStatusElement = ({ element }: PropsType) => {
  const { id, acaId, fuelLevel, h, w, weaponLoad } = element;
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
    
      const newFuelLevel = fuelLevel - 1; 
      dispatch(updateDroneFuelLevel({ payload: {droneId: id, newFuel: newFuelLevel }}));
    }, 1000); 

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, id, fuelLevel]);



  const getFuelColor = () => {
    if (fuelLevel < 0.2) {
      return 'bg-red-500';
    }
    return 'bg-gray-300';
  };


  const getLeftWeaponLoad = (index:number) => {
    return index < weaponLoad * 4 ? 'Used' : 'Unused';
  }

  const getRightWeaponLoad = (index:number) => {
    return index < weaponLoad * 4 ? 'Used' : 'Unused';
  }



  
  





  return (
    <div
      style={{ width: w, height: h, backgroundColor: '#2D2D30' }}
      className="bg-gray-800 rounded-lg flex flex-col justify-between"
    >
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full bg-blue-500 mr-2`}></div>
        <span className="text-[20px] text-white text-lg font-bold">ACA-{acaId}</span>
      </div>
      <div className="flex justify-center w-full mb-2 space-x-10">

      <div className="flex space-x-0.5">
        {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src={getLeftWeaponLoad(index) === 'Used' ? UsedBulletLeft : UnusedBulletLeft}
            alt="Weapon Load"
          />
        ))}
        </div>
        <div className="flex space-x-0.5">
          {[...Array(4)].map((_, index) => (
          <img
            key={index}
            src={getRightWeaponLoad(index) === 'Used' ? UsedBulletRight : UnusedBulletRight}
            alt="Weapon Load"
          />
        ))}
        </div>
      </div>

      <div className="w-full flex items-center h-6">
        <div className="h-1.5 w-full bg-gray-500 rounded-full">
        <div
          className={`h-1.5 ${getFuelColor()} rounded-full`}
        style={{ width: `${fuelLevel * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AcaStatusElement;
