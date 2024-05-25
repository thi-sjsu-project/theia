import type { MissileIncomingElement as MissileIncomingElementType } from 'src/types/element';
import IconElement from 'src/components/Element/Simple/IconElement';
import { useAppSelector } from 'src/redux/hooks';
import { getMessage } from 'src/redux/slices/minimapSlice';

type MissileIncomingProps = {
  element: MissileIncomingElementType;
};

const MissileIncomingElement = ({ element }: MissileIncomingProps) => {
  const { id, h, w, messageId, icon: iconElement } = element;
  const message = useAppSelector((state) => getMessage(state, messageId));

  return (
    <div id={id} className="flex text-white items-center gap-4">
      <IconElement element={iconElement} />
      <div>Missile!</div>
    </div>
  );
};

export default MissileIncomingElement;
