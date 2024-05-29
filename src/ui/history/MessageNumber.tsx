type MessageNumberProps = {
  number: number;
  glow: boolean;
};

const MessageNumber = ({ number, glow }: MessageNumberProps) => {
  return (
    <span
      className={`${glow ? 'bg-turquoise text-black' : 'bg-[#2d2d30] text-white'} text-xl font-bold flex flex-row py-1 mx-2 rounded-md items-center justify-center`}
    >
      {number}
    </span>
  );
};

export default MessageNumber;
