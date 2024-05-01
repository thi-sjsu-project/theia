import 'src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Prototype from 'src/components/Prototype';
import Minimap from 'src/pages/Minimap';
import LeftScreen from 'src/pages/LeftScreen';
import RightScreen from 'src/pages/RightScreen';
import Layout from 'src/pages/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="minimap" element={<Minimap />} />
          <Route path="left-screen" element={<LeftScreen />} />
          <Route path="right-screen" element={<RightScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
