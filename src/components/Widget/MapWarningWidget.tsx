import type { MapWarningWidget as MapWarningWidgetType } from 'src/types/widget';
import IconElement from '../Element/Simple/IconElement';

import threatRadarLgReg from 'src/icons/threats/radar-lg-reg.svg';
import threatRadarSmReg from 'src/icons/threats/radar-sm-reg.svg';
import threatRadarLgEmph from 'src/icons/threats/radar-lg-emph.svg';
import threatRadarSmEmph from 'src/icons/threats/radar-sm-emph.svg';
import threatMissileLgReg from 'src/icons/threats/missile-lg-reg.svg';
import threatMissileSmReg from 'src/icons/threats/missile-sm-reg.svg';
import threatMissileLgEmph from 'src/icons/threats/missile-lg-emph.svg';
import threatMissileSmEmph from 'src/icons/threats/missile-sm-emph.svg';
import threatArtilleryLgReg from 'src/icons/threats/artillery-lg-reg.svg';
import threatArtillerySmReg from 'src/icons/threats/artillery-sm-reg.svg';
import threatArtilleryLgEmph from 'src/icons/threats/artillery-lg-emph.svg';
import threatArtillerySmEmph from 'src/icons/threats/artillery-sm-emph.svg';
import threatAirDefenseLgReg from 'src/icons/threats/airdefense-lg-reg.svg';
import threatAirDefenseSmReg from 'src/icons/threats/airdefense-sm-reg.svg';
import threatAirDefenseLgEmph from 'src/icons/threats/airdefense-lg-emph.svg';
import threatAirDefenseSmEmph from 'src/icons/threats/airdefense-sm-emph.svg';

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
