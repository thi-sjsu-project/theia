import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Gaze from 'src/ui/Gaze';
import { useMousePosition } from 'src/hooks/useMousePosition';

const Layout = () => {
  // ~~~~~ React Router ~~~~~~
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const mousePosition = useMousePosition();

  // Redirect to /prototype if the user is on the root path
  useEffect(() => {
    if (pathname === '/') {
      navigate('/prototype');
    }
  }, [pathname, navigate]);

  return (
    <div>
      {/* {pathname !== '/prototype' && <Navigation />} */}
      {pathname !== '/prototype' && <Gaze mousePosition={mousePosition} />}

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
