import { useStopwatch } from 'react-timer-hook';

export type StopWatch = {
  hours: string;
  minutes: string;
  seconds: string;
};

export const useStopWatch = (): StopWatch => {
  const { hours, minutes, seconds } = useStopwatch({ autoStart: true });
  let hoursStr = hours.toString();
  let minutesStr = minutes.toString();
  let secondsStr = seconds.toString();

  if (hours / 10 < 1) hoursStr = `0${hours}`;
  if (minutes / 10 < 1) minutesStr = `0${minutes}`;
  if (seconds / 10 < 1) secondsStr = `0${seconds}`;

  return { hours: hoursStr, minutes: minutesStr, seconds: secondsStr };
};
