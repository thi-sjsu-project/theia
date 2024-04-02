import { useEffect } from 'react';
import monitor from 'src/prototype/monitor';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';

const Prototype = () => {
  console.log('Prototype component re-render');

  useEffect(() => {
    // use setInterval to run monitor every second (1000ms)
    const interval = setInterval(() => monitor({}), ONE_SECOND_IN_MS);
    return () => clearInterval(interval);
  }, []);

  return <div>Prototype</div>;
};

export default Prototype;
