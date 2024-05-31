type SortElementProps = {
  isActive: boolean;
  name: string;
};

const SortToggle = ({ isActive, name }: SortElementProps) => {
  return (
    <div
      className={`text-3xl rounded-lg px-4 h-full flex flex-col items-center justify-center w-full ${isActive ? 'bg-[#444449] text-white font-semibold' : 'bg-transparent text-[#bcbcbc]'}`}
    >
      {name.substring(0, 4).toUpperCase()}
    </div>
  );
};

export default SortToggle;
