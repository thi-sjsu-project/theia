import { useState } from 'react';
import Layout from './Layout';
import { useAppSelector } from 'src/redux/hooks';
import { getSections, getWidgets } from 'src/redux/slices/minimapSlice';

const Prototype3 = () => {
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
