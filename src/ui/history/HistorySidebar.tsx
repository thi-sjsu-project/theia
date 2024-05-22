type HistorySidebarProps = {
  index: number;
  isActive: boolean;
};

const HistorySidebar = ({ index, isActive }: HistorySidebarProps) => {
  return (
    <>
      <span className={`${isActive ? 'bg-turquoise text-black' : 'bg-[#2d2d30] text-white'} text-xl font-bold flex flex-row py-1 mx-2 rounded-md items-center justify-center`}>
        {index}
      </span>
      {index !== 1 && <div className="border-convo-bar h-full w-1/2 border-r-4 mt-4 flex flex-row items-center justify-center rounded-sm" />}
    </>
  );
};

export default HistorySidebar;
