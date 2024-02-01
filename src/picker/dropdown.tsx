import { Accessor, For, Setter, createEffect, createSignal } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { TimePickerDropdownItem } from './dropdown-item';
import styles from './styles.module.css';
import { Time } from './types';
import { range } from './utils';

type TimePickerDropdownProps = {
  isOpen: Accessor<boolean>;
  time: Accessor<Time>;
  setTime: Setter<Time>;
  onConfirm: () => void;
};

export function TimePickerDropdown(props: TimePickerDropdownProps) {
  let wrapperHoursRef: HTMLDivElement;
  let wrapperMinutesRef: HTMLDivElement;
  let wrapperSecondsRef: HTMLDivElement;

  const [currentScrollValueHours, setCurrentScrollValueHours] =
    createSignal<number>(0);
  const [currentScrollValueMinutes, setCurrentScrollValueMinutes] =
    createSignal<number>(0);
  const [currentScrollValueSeconds, setCurrentScrollValueSeconds] =
    createSignal<number>(0);

  createEffect(() => {
    if (props.isOpen()) {
      if (wrapperHoursRef)
        wrapperHoursRef.scrollTop = currentScrollValueHours();
      if (wrapperMinutesRef)
        wrapperMinutesRef.scrollTop = currentScrollValueMinutes();
      if (wrapperSecondsRef)
        wrapperSecondsRef.scrollTop = currentScrollValueSeconds();
    }
  });

  return (
    <div
      class={twMerge(
        'text-white absolute flex flex-col shadow-md bg-gray-950 rounded-lg mt-4 mx-auto h-fit w-64 items-center transition-all z-50 -translate-x-1/2 left-1/2',
        props.isOpen()
          ? 'max-h-96 border border-white/10 translate-y-0 opacity-100 duration-300 scale-100'
          : 'max-h-0 border-transparent border-none -translate-y-6 opacity-0 scale-75 overflow-hidden'
      )}
    >
      <div class="grid grid-cols-3 text-xs font-bold text-center border-b border-white/10 py-3 w-full">
        <p>hours</p>
        <p>minutes</p>
        <p>seconds</p>
      </div>
      <div class="grid grid-cols-3 text-xs font-bold text-center w-full overflow-hidden">
        <div
          ref={wrapperHoursRef!}
          class={twMerge(
            'flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth',
            `${styles.dropdown}`
          )}
        >
          <For each={range(0, 23)}>
            {(value) => (
              <TimePickerDropdownItem
                value={value}
                isSelected={props.time().hours === value}
                onSelected={(scrollValue: number) => {
                  if (props.isOpen()) setCurrentScrollValueHours(scrollValue);
                }}
                onClick={() => {
                  props.setTime((old) => {
                    return { ...old, hours: value };
                  });
                }}
              />
            )}
          </For>
        </div>
        <div
          ref={wrapperMinutesRef!}
          class={twMerge(
            'flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth',
            `${styles.dropdown}`
          )}
        >
          <For each={range(0, 59)}>
            {(value) => (
              <TimePickerDropdownItem
                value={value}
                isSelected={props.time().minutes === value}
                onSelected={(scrollValue: number) => {
                  if (props.isOpen()) setCurrentScrollValueMinutes(scrollValue);
                }}
                onClick={() => {
                  props.setTime((old) => {
                    return { ...old, minutes: value };
                  });
                }}
              />
            )}
          </For>
        </div>
        <div
          ref={wrapperSecondsRef!}
          class={twMerge(
            'flex flex-col items-center gap-2 overflow-y-auto p-2 scroll-smooth',
            `${styles.dropdown}`
          )}
        >
          <For each={range(0, 59)}>
            {(value) => (
              <TimePickerDropdownItem
                value={value}
                isSelected={props.time().seconds === value}
                onSelected={(scrollValue: number) => {
                  if (props.isOpen()) setCurrentScrollValueSeconds(scrollValue);
                }}
                onClick={() => {
                  props.setTime((old) => {
                    return { ...old, seconds: value };
                  });
                }}
              />
            )}
          </For>
        </div>
      </div>
      <div class="w-full px-2 py-3 border-t border-white/10">
        <button
          class="text-xs text-white font-bold bg-orange-800 w-full h-8 rounded-md hover:bg-orange-700 transition-colors"
          onClick={props.onConfirm}
        >
          Select
        </button>
      </div>
    </div>
  );
}
