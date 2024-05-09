import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import IconElement from '../Element/Simple/IconElement';

import threatRadarLgReg from 'src/assets/icons/threats/radar-lg-reg.svg';
import threatRadarSmReg from 'src/assets/icons/threats/radar-sm-reg.svg';
import threatRadarLgEmph from 'src/assets/icons/threats/radar-lg-emph.svg';
import threatRadarSmEmph from 'src/assets/icons/threats/radar-sm-emph.svg';
import threatMissileLgReg from 'src/assets/icons/threats/missile-lg-reg.svg';
import threatMissileSmReg from 'src/assets/icons/threats/missile-sm-reg.svg';
import threatMissileLgEmph from 'src/assets/icons/threats/missile-lg-emph.svg';
import threatMissileSmEmph from 'src/assets/icons/threats/missile-sm-emph.svg';
import threatArtilleryLgReg from 'src/assets/icons/threats/artillery-lg-reg.svg';
import threatArtillerySmReg from 'src/assets/icons/threats/artillery-sm-reg.svg';
import threatArtilleryLgEmph from 'src/assets/icons/threats/artillery-lg-emph.svg';
import threatArtillerySmEmph from 'src/assets/icons/threats/artillery-sm-emph.svg';
import threatAirDefenseLgReg from 'src/assets/icons/threats/airdefense-lg-reg.svg';
import threatAirDefenseSmReg from 'src/assets/icons/threats/airdefense-sm-reg.svg';
import threatAirDefenseLgEmph from 'src/assets/icons/threats/airdefense-lg-emph.svg';
import threatAirDefenseSmEmph from 'src/assets/icons/threats/airdefense-sm-emph.svg';

type MapWarningWidgetProps = {
  widget: MapWarningWidgetType;
};

// [type][small (0 = false, 1 = true)][emphasised (0 = false, 1 = true)]
const ICONS = {
  radar: [
    [threatRadarLgReg, threatRadarLgEmph],
    [threatRadarSmReg, threatRadarSmEmph],
  ],
  artillery: [
    [threatArtilleryLgReg, threatArtilleryLgEmph],
    [threatArtillerySmReg, threatArtillerySmEmph],
  ],
  'air-defense': [
    [threatAirDefenseLgReg, threatAirDefenseLgEmph],
    [threatAirDefenseSmReg, threatAirDefenseSmEmph],
  ],
  missile: [
    [threatMissileLgReg, threatMissileLgEmph],
    [threatMissileSmReg, threatMissileSmEmph],
  ],
};

const MapWarningWidget = ({ widget }: MapWarningWidgetProps) => {
  const img = ICONS[widget.threatType][+widget.small][+widget.emphasised];

  return (
    <div
      key={widget.id}
      id={widget.id}
      className="absolute"
      style={{
        top: ~~widget.y,
        left: ~~widget.x,
      }}
    >
      <img src={img} alt={widget.threatType} />
    </div>
  );
};

export default MapWarningWidget;
