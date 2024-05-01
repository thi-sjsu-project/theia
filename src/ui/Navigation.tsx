import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-800">
      <div
        className="container flex items-center justify-center p-1 
        mx-auto text-gray-600 capitalize dark:text-gray-300"
      >
        <NavLink
          to="/left-screen"
          className={`text-gray-800 dark:text-gray-200 border-b-2 
          ${pathname === '/left-screen' ? 'border-blue-500' : ''} mx-1.5 sm:mx-6`}
        >
          Left Screen
        </NavLink>
        <NavLink
          to="/minimap"
          className={`text-gray-800 dark:text-gray-200 border-b-2 
          ${pathname === '/minimap' ? 'border-blue-500' : ''} mx-1.5 sm:mx-6`}
        >
          Minimap
        </NavLink>
        <NavLink
          to="/right-screen"
          className={`text-gray-800 dark:text-gray-200 border-b-2 
          ${pathname === '/right-screen' ? 'border-blue-500' : ''} : '' mx-1.5 sm:mx-6`}
        >
          Right Screen
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
