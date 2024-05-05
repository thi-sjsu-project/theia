import { useEffect, useRef, useState } from 'react';
import type { Message } from 'src/types/schema-types';

type IncomingMessage = {
  message: Message;
  stressLevel: number;
};

const useWorldSim = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stressLevel, setStressLevel] = useState<number>(0);
  const socket = useRef<WebSocket | null>();

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:6969');

    socket.current.addEventListener('open', (event) => {
      console.log('\x1b[32mconnection opened\x1b[0m');
    });

    socket.current.addEventListener('message', (event) => {
      // console.log('\x1b[34mmessage received:\x1b[0m', event.data);
      const { message, stressLevel }: IncomingMessage = JSON.parse(event.data);
      if (message) setMessages((prevMessages) => [...prevMessages, message]);
      if (stressLevel) setStressLevel(stressLevel);
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
