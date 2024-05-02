import 'src/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Minimap from 'src/pages/Minimap';
import LeftScreen from 'src/pages/LeftScreen';
import RightScreen from 'src/pages/RightScreen';
import Root from 'src/pages/Root';
import useMoveShips from 'src/hooks/useMoveShips';

const App = () => {
  useMoveShips();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="minimap" element={<Minimap />} />
          <Route path="left-screen" element={<LeftScreen />} />
          <Route path="right-screen" element={<RightScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
