import type { Message } from 'src/types/schema-types';

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  /* return (
    <div className="bg-green-200 w-[30rem] h-96 px-2 py-1">
      <p className="text-center text-5xl">List of Messages:</p>
      <ul className="overflow-y-scroll divide-y divide-stone-500 h-80">
        {messages.map((msg) => (
          <li key={msg}>
            <div>
              <span className="text-3xl">
                {msg === 'tinder' ? 'Tinder Message' : msg}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ); */
};

export default MessageList;
