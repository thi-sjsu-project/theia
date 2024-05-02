import { useEffect, useRef, useState } from 'react';
import type { Message, SimToCmMessage, Range } from 'src/types/schema-types';

const useWorldSim = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stressLevel, setStressLevel] = useState<Range<0,1>>(0);
  const socket = useRef<WebSocket | null>();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:6969');

    socket.current.addEventListener('open', (_event) => {
      console.log('\x1b[32mconnection opened\x1b[0m');
    });

    socket.current.addEventListener('message', (event) => {
      // console.log('\x1b[34mmessage received:\x1b[0m', event.data);
      const { message, stressLevel }: SimToCmMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message!]);
      setStressLevel(stressLevel!);
    });

    socket.current.addEventListener('close', (event) => {
      console.log('\x1b[31mconnection closed\x1b[0m');
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  return { messages, stressLevel };
};

export default useWorldSim;
