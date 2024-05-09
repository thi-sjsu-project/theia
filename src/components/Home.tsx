import { NavLink } from 'react-router-dom';
import { useStopWatch } from 'src/hooks/useStopWatch';
import Spinner from 'src/ui/Spinner';

const Home = () => {
  const { hours, minutes, seconds } = useStopWatch();

  return (
    <div
      className="h-screen flex items-center 
justify-center flex-col gap-10"
    >
      <p className="text-5xl text-blue-700">Conversation Manager</p>

      <div>
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-2xl">Running</span>
          <Spinner />
        </div>

        <span className="text-md">
          Time elpased: {hours}:{minutes}:{seconds}
        </span>
      </div>

      <div className="mt-10">
        <p className="text-3xl text-center">Pages:</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div>
            <NavLink
              to="/left-screen"
              target="_blank"
              className="w-24 bg-transparent hover:bg-blue-500 
      text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent 
        rounded text-sm px-2 py-1 text-center"
            >
              Left Screen
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/minimap"
              target="_blank"
              className="w-24 bg-transparent hover:bg-blue-500 
      text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent 
        rounded text-sm px-2 py-1 text-center"
            >
              Minimap
            </NavLink>
          </div>

          <div>
            <NavLink
              to="/right-screen"
              target="_blank"
              className="w-24 bg-transparent hover:bg-blue-500 
      text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent 
        rounded text-sm px-2 py-1 text-center"
            >
              Right Screen
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
