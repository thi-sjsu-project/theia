import type { MissileIncomingElement as MissileIncomingElementType } from 'src/types/element';
import IconElement from 'src/components/Element/Simple/IconElement';

type MissileIncomingProps = {
  element: MissileIncomingElementType;
};

const MissileIncomingElement = ({ element }: MissileIncomingProps) => {
  const { id, h, w, message, icon: iconElement } = element;
  const {
    data: {
      detectedByAca,
      missileLocation,
      choiceWeight,
      survivability,
      acaAttackWeapon,
    },
    priority,
  } = message;

  return (
    <div id={id} className="flex text-white items-center gap-4">
      <IconElement element={iconElement} />
      <div>Missile!</div>
    </div>
  );
};

export default MissileIncomingElement;
