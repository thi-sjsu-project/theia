import Prototype2 from 'src/components/Prototype2';
import 'src/App.css';
import { useState } from 'react';

const App = () => {
  const [playDemo, setPlayDemo] = useState(false);

  if (playDemo) {
    return <Prototype2 />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => setPlayDemo(true)}
        className="w-100 bg-transparent hover:bg-blue-500 
    text-blue-700 font-semibold hover:text-white py-2 
    px-4 border border-blue-500 hover:border-transparent 
    rounded text-4xl"
      >
        START AMAZING DEMO!!!
      </button>
    </div>
  );
};

export default App;
