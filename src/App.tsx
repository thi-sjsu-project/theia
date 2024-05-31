import 'src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Minimap from 'src/pages/Minimap';
import LeftScreen from 'src/pages/LeftScreen';
import RightScreen from 'src/pages/RightScreen';
import Layout from 'src/pages/Layout';
import Prototype from 'src/pages/Prototype';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    return () =>
      document.removeEventListener('contentmenu', (event) =>
        event.preventDefault(),
      );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/prototype" element={<Prototype />} />
          <Route path="minimap" element={<Minimap />} />
          <Route path="pearce-screen" element={<LeftScreen />} />
          <Route path="right-screen" element={<RightScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
