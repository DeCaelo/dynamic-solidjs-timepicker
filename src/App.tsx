import { createSignal, type Component } from 'solid-js';
import { Picker } from './picker';

const App: Component = () => {
  const [time, setTime] = createSignal<number>(0);

  return (
    <div class="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div class="flex flex-col w-full max-w-xs">
        <Picker time={time} setTime={setTime} />
      </div>
    </div>
  );
};

export default App;
