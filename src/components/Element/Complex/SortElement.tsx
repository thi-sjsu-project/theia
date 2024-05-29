import type { SortMethod } from 'src/types/sortMethod';

type SortElementProps = {
  isActive: boolean;
  name: string;
  sortMethod: SortMethod;
};

const SortElement = ({ isActive, name, sortMethod }: SortElementProps) => {

  return (
    <div className={`text-3xl ${isActive ? 'bg-[#444449] text-white font-semibold' : 'bg-transparent text-[#bcbcbc]'}`} onMouseEnter={() => console.log("setting sort method to ", sortMethod)}>
      {name.substring(0, 4).toUpperCase()}
    </div>
  );
};

export default SortElement;
