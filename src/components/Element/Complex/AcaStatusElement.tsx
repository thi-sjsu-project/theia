import { type AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import UsedBullet from 'src/assets/used.png';
import UnusedBullet from 'src/assets/unused.png';
import { useAppDispatch } from 'src/redux/hooks';

type PropsType = {
  element: AcaStatusElementType;
};

const AcaStatusElement = ({ element }: PropsType) => {
  const { id, acaId, fuelLevel, h, w, weaponLoad } = element;
  const dispatch = useAppDispatch();

  return (
    <div
      style={{ width: w, height: h, backgroundColor: '#2D2D30' }}
      className="bg-gray-800 rounded-lg flex flex-col justify-between"
    >
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full bg-blue-500 mr-2`}></div>
        <span className="text-white text-lg font-bold">ACA{acaId}</span>
      </div>
      <div className="flex justify-between w-full mb-2 space-x-4">
        {/* <div className="flex">
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
        </div> */}
      </div>
      <div className="w-full flex items-center h-6">
        <div className="h-1.5 w-full bg-gray-500 rounded-full">
          <div
            className={`h-1.5 bg-gray-300 rounded-full`}
            style={{ width: `${fuelLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AcaStatusElement;
