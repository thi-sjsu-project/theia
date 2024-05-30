import { type AcaStatusElement as AcaStatusElementType } from 'src/types/element';
import WEAPON_ICON_1 from 'src/assets/icons/weapon1.svg';
import WEAPON_ICON_2 from 'src/assets/icons/weapon2.svg';
import { getMessages } from 'src/redux/slices/conversationSlice';
import { useAppSelector } from 'src/redux/hooks';

type PropsType = {
  element: AcaStatusElementType;
};

const AcaStatusElement = ({ element }: PropsType) => {
  const { id, acaId, fuelLevel, h, w, weaponLoad1, weaponLoad2, isDead } =
    element;

  // let border = false;

  const messages = useAppSelector(getMessages);
  // console.log(messages);
  
  const getAcaDotStatus = () => {
    
    const latestMessage = messages[messages.length-1];
    // && (latestMessage.kind == 'AcaDefect' || latestMessage.kind == 'AcaFuelLow')

    /*@ts-ignore*/
    if(latestMessage?.tags?.includes(`aca-${acaId}`) && (latestMessage.kind == 'AcaDefect' || latestMessage.kind == 'AcaFuelLow' || latestMessage.kind == 'AcaHeadingToBase')){
      return {color: 'bg-[#FCA700]', border: 'border-0'};
    }
    else if(latestMessage?.tags?.includes(`aca-${acaId}`) &&!(latestMessage.kind == 'AcaDefect' || latestMessage.kind == 'AcaFuelLow' || latestMessage.kind == 'AcaHeadingToBase' )){
      return {color: 'bg-[#19DEBB]', border: 'border-0'};
    }
    else{
    return {color: 'bg-[#323235]', border:'border-2'}; 
    }
  }

  const {color, border} = getAcaDotStatus();
  console.log(`Applied classes: color=${color}, border=${border}`);



    

  return (
    <div
      id={id}
      className="bg-[#323235] rounded-lg shadow-[#111] shadow-md px-2 py-1"
      style={{
        width: w,
        height: h,
        opacity: isDead ? '20%' : '100%',
      }}
    >
      {/* this is absolutely evil, but sometimes, manually writing raw svg code is quicker and easier than css. it's especially useful when you can just mutate the svg based on react state. */}
      {/* prettier-ignore */}
      <svg className="absolute -ml-2" style={{ width: w, height: 8, marginTop: h - 12 }}>
        <clipPath id="clip">
          <rect x={0} y={-8} width={w} height={16} rx={8} />
        </clipPath>
        <rect clipPath="url(#clip)" x={w * fuelLevel} y={0} width={w - (w * fuelLevel)} height={8} fill="#252526" />
        <rect clipPath="url(#clip)" x={0} y={0} width={w * fuelLevel} height={8} fill={fuelLevel <= 0.2 ? "#a52020" : "#a5a5a5"} />
        <line x1={w * 0.25} x2={w * 0.25} y1={0} y2={8} strokeWidth={2} stroke="#595959" />
        <line x1={w * 0.5} x2={w * 0.5} y1={0} y2={8} strokeWidth={2} stroke="#595959" />
        <line x1={w * 0.75} x2={w * 0.75} y1={0} y2={8} strokeWidth={2} stroke="#595959" />
        <line clipPath="url(#clip)" x1={w * fuelLevel} x2={w * fuelLevel} y1={0} y2={8} strokeWidth={2} stroke="#f5f5f5" />
      </svg>

      <div>
        <div className={`inline-block w-4 h-4 rounded-full  ${border}  ${color} mr-2`}></div>
        <span className="text-[#f5f5f5] text-[20px]">ACA-{acaId}</span>
      </div>

      {/* prettier-ignore */}
      <div className="flex gap-0.5">
        <img src={WEAPON_ICON_1} alt="w1" style={{filter: weaponLoad1 < 0.125 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_1} alt="w1" style={{filter: weaponLoad1 < 0.375 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_1} alt="w1" style={{filter: weaponLoad1 < 0.625 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_1} alt="w1" style={{filter: weaponLoad1 < 0.875 ? "brightness(0%)" : "brightness(65%)"}} />
        <div className="grow" />
        <img src={WEAPON_ICON_2} alt="w2" style={{filter: weaponLoad2 < 0.125 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_2} alt="w2" style={{filter: weaponLoad2 < 0.375 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_2} alt="w2" style={{filter: weaponLoad2 < 0.625 ? "brightness(0%)" : "brightness(65%)"}} />
        <img src={WEAPON_ICON_2} alt="w2" style={{filter: weaponLoad2 < 0.875 ? "brightness(0%)" : "brightness(65%)"}} />
      </div>
    </div>
  );
};

export default AcaStatusElement;
