import { type Target } from 'src/types/schema-types';
import AirDefenseSmReg from 'src/assets/icons/threats/airdefense-sm-reg.svg';
import ArtillerySmReg from 'src/assets/icons/threats/artillery-sm-reg.svg';
import RadarSmReg from 'src/assets/icons/threats/radar-sm-reg.svg';
import MissileLgEmph from 'src/assets/icons/threats/missile-lg-emph.svg';

// also pass in stress level to determine size of icon?
// or just pass in a size (sm, lg)
// also a boolean for whether we want emphasized version of the icon?
export const mapTargetTypeToWarningIcon = (
  targetType: Target['type'] | 'missile',
) => {
  switch (targetType) {
    case 'airDefense':
      return AirDefenseSmReg;
    case 'artillery':
      return ArtillerySmReg;
    case 'radar':
      return RadarSmReg;
    case 'missile':
      return MissileLgEmph;
    default:
      return AirDefenseSmReg;
  }
};
