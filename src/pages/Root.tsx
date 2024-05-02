import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Gaze from 'src/ui/Gaze';
import Navigation from 'src/ui/Navigation';
import { useMousePosition } from 'src/hooks/useMousePosition';

const Root = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mousePosition = useMousePosition();

  // Redirect to /minimap if the user is on the root path
  useEffect(() => {
    if (pathname === '/') {
      navigate('/minimap');
    }
  }, [pathname, navigate]);

  return (
    <div>
      <Navigation />
      <Gaze mousePosition={mousePosition} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
