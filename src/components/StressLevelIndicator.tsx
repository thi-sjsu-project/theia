import { useAppSelector } from 'src/redux/hooks';
import { getStressLevel } from 'src/redux/slices/cmSlice';

const StressLevelIndicator = () => {
  const stressLevel = useAppSelector(getStressLevel);

  const colors = [
    'bg-green-400',
    stressLevel < 1 ? 'bg-gray-600' : 'bg-yellow-300',
    stressLevel < 2 ? 'bg-gray-600' : 'bg-red-400',
  ];

  return (
    <div className="fixed bottom-0 w-32 bg-gray-800 left-[calc(50vw-4rem)] h-7 flex p-2.5 rounded-t-xl gap-0.5">
      <div className={`${colors[0]} h-full grow rounded-l-full`}></div>
      <div className={`${colors[1]} h-full grow`}></div>
      <div className={`${colors[2]} h-full grow rounded-r-full`}></div>
    </div>
  );
};

export default StressLevelIndicator;
