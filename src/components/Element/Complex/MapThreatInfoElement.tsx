import type { InformationElement } from 'src/types/element';

type Props = {
  element: InformationElement;
};

const MapThreatInfoElement = ({ element }: Props) => {
  // could also fetch messages from redux
  // provided there is a conversation number
  const { title, messages } = element;

  return (
    <div
      id={element.id}
      style={{
        height: 60,
        width: 100,
        backgroundColor: 'turquoise',
        opacity: 0.8,
      }}
    >
      {title}
    </div>
  );
};

export default MapThreatInfoElement;
