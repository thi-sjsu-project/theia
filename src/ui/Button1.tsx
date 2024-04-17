type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  <button
    onClick={onClick}
    className="w-100 bg-transparent hover:bg-blue-500 
    text-blue-700 font-semibold hover:text-white py-2 
    px-4 border border-blue-500 hover:border-transparent 
    rounded text-4xl"
  >
    {text}
  </button>;
};

export default Button;
