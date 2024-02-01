import { createEffect } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { padNumberToString } from './utils';

type TimePickerDropdownPropsItem = {
  value: number;
  isSelected: boolean;
  onClick: () => void;
  onSelected: (value: number) => void;
};

export function TimePickerDropdownItem(props: TimePickerDropdownPropsItem) {
  let itemRef: HTMLDivElement;

  createEffect(() => {
    if (itemRef && props.isSelected) {
      setTimeout(() => {
        const itemHeight = itemRef.getBoundingClientRect().height;
        props.onSelected(itemRef.offsetTop - itemHeight * 2);
      }, 50);
    }
  });

  return (
    <div
      ref={itemRef!}
      class={twMerge(
        'text-center text-xs text-white w-full cursor-pointer rounded-md flex items-center justify-center py-1 font-semibold hover:bg-white/10',
        props.isSelected && 'bg-orange-800 hover:bg-orange-800'
      )}
      onClick={props.onClick}
    >
      {padNumberToString(props.value)}
    </div>
  );
}
