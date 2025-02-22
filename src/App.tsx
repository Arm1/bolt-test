import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import CardGame from './components/CardGame';
import { Play, Pause } from 'lucide-react';

function App() {
  const [isPaused, setIsPaused] = React.useState(false);

  const handleStart = () => setIsPaused(false);
  const handlePause = () => setIsPaused(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 flex space-x-4">
        <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">
          <Play className="w-5 h-5" /> Start
        </button>
        <button onClick={handlePause} className="bg-red-500 text-white px-4 py-2 rounded">
          <Pause className="w-5 h-5" /> Pause
        </button>
      </div>
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <CardGame isPaused={isPaused} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
