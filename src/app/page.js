'use client';
import { Pause } from '@/components/Pause';
import { Play } from '@/components/Play';
import { Reset } from '@/components/Reset';
import React from 'react';

export default function Stopwatch() {
  const [playing, setPlaying] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setPlaying(false);
  };

  React.useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        if (seconds / 60 === 1) {
          setSeconds(0);
          setMinutes((prev) => prev + 1);
          if (minutes / 60 === 1) {
            setMinutes(0);
            setHours((prev) => prev + 1);
          }
        } else {
          setSeconds((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearTimeout(interval);
  }, [playing, minutes, seconds]);

  return (
    <div className='absolute flex flex-col justify-center gap-10 items-center h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_1px)] [background-size:60px_60px]'>
      <p className='text-[3.5rem] md:text-[6rem] font-bold mt-1 leading-none text-center p-5'>
        Stopwatch
      </p>
      <div className='p-10 w-[95vw] lg:w-[50vw] flex flex-col justify-around gap-10 items-center bg-zinc-200 backdrop-blur-sm bg-opacity-50 rounded-lg'>
        <p className='text-5xl md:text-6xl font-bold'>
          {(hours < 10 ? '0' + hours.toString() : hours) +
            ':' +
            (minutes < 10 ? '0' + minutes.toString() : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds.toString() : seconds)}
        </p>
        <div className='text-center flex flex-row justify-between items-center gap-10 text-5xl'>
          {!playing ? (
            <Play
              onClick={() => handlePlayPause()}
              className='text-green-700 bg-white hover:text-white hover:bg-green-700 w-28 cursor-pointer rounded-md transition duration-500'
            />
          ) : (
            <Pause
              onClick={() => handlePlayPause()}
              className='text-orange-600 bg-white hover:text-white hover:bg-orange-600 w-28 cursor-pointer rounded-md transition duration-500'
            />
          )}
          <Reset
            onClick={() => handleReset()}
            className='text-red-700 bg-white hover:text-white hover:bg-red-700 w-28 cursor-pointer rounded-md transition duration-500'
          />
        </div>
      </div>
    </div>
  );
}
