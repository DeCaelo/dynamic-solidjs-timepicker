import { Time } from './types';

export function secondsToTime(seconds: number): Time {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours,
    minutes,
    seconds: remainingSeconds
  };
}

export function timeToSeconds(values: Time): number {
  return values.hours * 3600 + values.minutes * 60 + values.seconds;
}

export function padNumberToString(number: number): string {
  return String(number).padStart(2, '0');
}

export function checkIsNumber(value: string): boolean {
  const number = parseFloat(value);

  if (!isNaN(number)) {
    return true;
  } else {
    return false;
  }
}
