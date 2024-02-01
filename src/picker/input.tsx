import { Accessor, Setter, createEffect } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Time } from './types';
import { checkIsNumber, padNumberToString } from './utils';

type TimePickerInputProps = {
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
  time: Accessor<Time>;
  setTime: Setter<Time>;
};

export function TimePickerInput(props: TimePickerInputProps) {
  let inputHoursRef: HTMLInputElement;
  let inputMinutesRef: HTMLInputElement;
  let inputSecondsRef: HTMLInputElement;

  const isNotEmpty = () =>
    props.isOpen() ||
    props.time().hours > 0 ||
    props.time().minutes > 0 ||
    props.time().seconds > 0;

  const inputClass =
    'text-white text-xs text-center bg-transparent outline-none h-7 w-8 cursor-pointer hover:bg-white/10 rounded-md';

  function handleOnInputHours(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 23)
        props.setTime((old) => ({ ...old, hours: numberValue }));
      else inputHoursRef.value = padNumberToString(props.time().hours);
    }
  }

  function handleOnInputMinutes(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 59)
        props.setTime((old) => ({ ...old, minutes: numberValue }));
      else inputMinutesRef.value = padNumberToString(props.time().minutes);
    }
  }

  function handleOnInputSeconds(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (checkIsNumber(value)) {
      const numberValue = parseInt(value);
      if (numberValue >= 0 && numberValue <= 59)
        props.setTime((old) => ({ ...old, seconds: numberValue }));
      else inputSecondsRef.value = padNumberToString(props.time().seconds);
    }
  }

  createEffect(() => {
    if (inputHoursRef && props.isOpen()) {
      inputHoursRef.focus();
    }

    if (inputHoursRef && !props.isOpen()) {
      inputHoursRef.blur();
    }

    if (inputMinutesRef && !props.isOpen()) {
      inputMinutesRef.blur();
    }

    if (inputSecondsRef && !props.isOpen()) {
      inputSecondsRef.blur();
    }
  });

  return (
    <div
      class={twMerge(
        'cursor-pointer text-white/80 text-xs font-semibold bg-gray-950 hover:bg-gray-950/70 border border-white/10 shadow-sm rounded-md w-full h-9 flex items-center px-3 transition-all',
        props.isOpen() && 'outline-none ring-1 ring-white/40'
      )}
      onClick={() => props.setIsOpen(true)}
    >
      <p class={twMerge('', isNotEmpty() && 'hidden')}>Select time</p>
      <div
        class={twMerge(
          'flex items-center w-fit gap-1 -ml-2',
          !isNotEmpty() && 'hidden'
        )}
      >
        <input
          ref={inputHoursRef!}
          class={inputClass}
          value={padNumberToString(props.time().hours)}
          onInput={handleOnInputHours}
        />
        <p>:</p>
        <input
          ref={inputMinutesRef!}
          class={inputClass}
          value={padNumberToString(props.time().minutes)}
          onInput={handleOnInputMinutes}
        />
        <p>:</p>
        <input
          ref={inputSecondsRef!}
          class={inputClass}
          value={padNumberToString(props.time().seconds)}
          onInput={handleOnInputSeconds}
        />
      </div>
    </div>
  );
}
