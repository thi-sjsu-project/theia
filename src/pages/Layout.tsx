import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from 'src/ui/Navigation';

const Layout = () => {
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

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
