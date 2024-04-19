import { useState } from 'react';
import Layout from './Layout';
import { useAppSelector } from 'src/redux/hooks';
import { getSections, getWidgets } from 'src/redux/slices/minimapSlice';
import { useMousePosition } from 'src/hooks/useMousePosition';

const Prototype3 = () => {
  const mousePosition = useMousePosition();
  console.log(mousePosition);

  const [messages, setMessages] = useState<string[]>([]);

  const sections = useAppSelector(getSections);
  const widgets = useAppSelector(getWidgets);

  return (
    <>
      <Layout widgets={widgets} />
    </>
  );
};

export default Prototype3;
