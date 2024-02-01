import { Accessor, Setter } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Time } from './types';

type TimePickerDropdownProps = {
  isOpen: Accessor<boolean>;
  time: Accessor<Time>;
  setTime: Setter<Time>;
  onConfirm: () => void;
};

export function TimePickerDropdown(props: TimePickerDropdownProps) {
  return (
    <div
      class={twMerge(
        'text-white absolute flex flex-col shadow-md bg-gray-950 rounded-lg mt-4 mx-auto h-fit w-64 items-center transition-all z-50 -translate-x-1/2 left-1/2',
        props.isOpen()
          ? 'max-h-96 border border-white/10 translate-y-0 opacity-100 duration-300 scale-100'
          : 'max-h-0 border-transparent border-none -translate-y-6 opacity-0 scale-75 overflow-hidden'
      )}
    >
      dropdown
    </div>
  );
}
