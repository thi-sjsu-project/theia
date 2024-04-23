import { useEffect, useRef } from 'react';
import type { Message } from 'src/types/schema-types';

type PropsType = {
  onNewMessage: (message: Message) => void;
};

const useWorldSim = ({ onNewMessage }: PropsType) => {
  const socket = useRef<WebSocket | null>();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:6969');

    socket.current.addEventListener('open', (event) => {
      console.log('\x1b[32mconnection opened\x1b[0m');
    });

    socket.current.addEventListener('message', (event) => {
      // console.log('\x1b[34mmessage received:\x1b[0m', event.data);
      const message = JSON.parse(event.data);
      onNewMessage(message);
    });

    socket.current.addEventListener('close', (event) => {
      console.log('\x1b[31mconnection closed\x1b[0m');
    });

    return () => {
      socket.current?.close();
    };
  }, []);
};

export default useWorldSim;
