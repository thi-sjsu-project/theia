import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Prototype from 'src/components/Prototype';
import Navigation from 'src/ui/Navigation';

const Root = () => {
  // ~~~~~ React Router ~~~~~~
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redirect to /minimap if the user is on the root path
  useEffect(() => {
    if (pathname === '/') {
      navigate('/minimap');
    }
  }, [pathname, navigate]);

  return (
    <div>
      <Navigation />
      <Prototype />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
