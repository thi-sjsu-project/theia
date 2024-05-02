import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-800 right-0 min-w-[200px] w-auto absolute">
      <div
        className="flex flex-col gap-8 items-center p-1 mx-auto text-gray-600 capitalize 
        dark:text-gray-300"
      >
        <NavLink
          to="/left-screen"
          className={`text-gray-800 dark:text-gray-200 border-b-2
          ${pathname === '/left-screen' ? 'border-blue-500' : ''} mx-1.5 sm:mx-6 text-3xl`}
        >
          Left Screen
        </NavLink>
        <NavLink
          to="/minimap"
          className={`text-gray-800 dark:text-gray-200 border-b-2 
          ${pathname === '/minimap' ? 'border-blue-500' : ''} mx-1.5 sm:mx-6 text-3xl`}
        >
          Minimap
        </NavLink>
        <NavLink
          to="/right-screen"
          className={`text-gray-800 dark:text-gray-200 border-b-2 
          ${pathname === '/right-screen' ? 'border-blue-500' : ''} : '' mx-1.5 sm:mx-6 text-3xl`}
        >
          Right Screen
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
