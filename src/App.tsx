import 'src/App.css';
import { useState } from 'react';
import Prototype3 from 'src/components/Prototype3';
import Button from 'src/ui/Button1';

const App = () => {
  const [playDemo, setPlayDemo] = useState(false);

  if (!playDemo) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Button
          onClick={() => setPlayDemo(true)}
          text="START AMAZING DEMO!!!"
        />
      </div>
    );
  }

  return <Prototype3 />;
};

export default App;
