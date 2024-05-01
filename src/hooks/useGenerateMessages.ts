import { useEffect, useState } from 'react';
import { ONE_SECOND_IN_MS } from 'src/utils/constants';

const useGenerateMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  // generate messages every five seconds and udpate local state
  useEffect(() => {
    let msgIndex = 0;
    const listOfMsg = [
      'MissileToOwnshipDetected',
      'AcaHeadingToBase',
      'RequestApprovalToAttack',
      'AcaFuelLow',
      'MissileToOwnshipDetected',
      'AcaDefect',
    ];

    //messages and their corresponding section type (for quick reference)
    // 'tinder',                   -> tinder
    // 'AcaHeadingToBase',         -> message
    // 'RequestApprovalToAttack',  -> request
    // 'MissileToOwnshipDetected', -> highWarning
    // 'AcaFuelLow',               -> lowWarning

    const generateMessage = () => {
      if (msgIndex >= listOfMsg.length) return;

      const message = listOfMsg[msgIndex];
      setMessages((prevMessages) => [...prevMessages, message]);
      msgIndex++;
    };

    // generate message every five seconds
    const interval = setInterval(generateMessage, ONE_SECOND_IN_MS * 3);

    return () => clearInterval(interval);
  }, []);

  return { messages };
};

export default useGenerateMessages;
