import { Accessor, Setter, createSignal, onCleanup, onMount } from 'solid-js';
import { TimePickerDropdown } from './dropdown';
import { TimePickerInput } from './input';
import { Time } from './types';
import { secondsToTime, timeToSeconds } from './utils';

type PickerProps = {
  time: Accessor<number>;
  setTime: Setter<number>;
};

export function Picker(props: PickerProps) {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [time, setTime] = createSignal<Time>(secondsToTime(props.time()));
  let wrapperRef: HTMLDivElement;

  function handleClickOutside(event: Event) {
    if (wrapperRef && !wrapperRef.contains(event.target as Node)) {
      setIsOpen(false);
      setTime(secondsToTime(props.time()));
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div ref={wrapperRef!} class="relative w-full">
      <TimePickerInput
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        time={time}
        setTime={setTime}
      />
      <TimePickerDropdown
        isOpen={isOpen}
        time={time}
        setTime={setTime}
        onConfirm={() => {
          props.setTime(timeToSeconds(time()));
          setIsOpen(false);
        }}
      />
    </div>
  );
}
