'use client';
import { Pause } from '@/components/Pause';
import { Play } from '@/components/Play';
import { Reset } from '@/components/Reset';
import React from 'react';

export default function Stopwatch() {
  const [playing, setPlaying] = React.useState(false);
  const [milliseconds, setMilliseconds] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleReset = () => {
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setPlaying(false);
  };

  React.useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        if (milliseconds == 59) {
          setMilliseconds(0);
          setSeconds((prev) => prev + 1);
          if (seconds == 59) {
            setSeconds(0);
            setMinutes((prev) => prev + 1);
            if (minutes == 59) {
              setMinutes(0);
              setHours((prev) => prev + 1);
            }
          }
        } else {
          setMilliseconds((prev) => prev + 1);
        }
      }, 17);
    }
    return () => clearTimeout(interval);
  }, [playing, minutes, seconds, milliseconds]);

  return (
    <div className='absolute flex flex-col justify-center gap-2 md:gap-10 items-center h-full w-full bg-white bg-[radial-gradient(#e5e7eb_2px,transparent_1px)] [background-size:60px_60px]'>
      <p className='text-[3.5rem] md:text-[6rem] font-bold mt-1 leading-none text-center p-5'>
        Stopwatch
      </p>
      <div className='p-10 mx-2 w-[95vw] lg:w-[50vw] flex flex-col justify-around gap-10 items-center bg-gray-200 backdrop-blur-sm bg-opacity-40 rounded-lg shadow-sm'>
        <p className='text-3xl md:text-6xl font-bold flex'>
          <span className='min-w-12 md:w-20'>
            {hours < 10 ? '0' + hours.toString() : hours}
          </span>
          <span>&nbsp;:&nbsp;</span>
          <span className='min-w-12 md:w-20'>
            {minutes < 10 ? '0' + minutes.toString() : minutes}
          </span>
          <span>&nbsp;:&nbsp;</span>
          <span className='min-w-12 md:w-20'>
            {seconds < 10 ? '0' + seconds.toString() : seconds}
          </span>
          <span>&nbsp;:&nbsp;</span>
          <span className='min-w-12 md:w-20'>
            {milliseconds < 10 ? '0' + milliseconds.toString() : milliseconds}
          </span>
        </p>
        <div className='text-center flex flex-row justify-between items-center gap-10 text-5xl'>
          {!playing ? (
            <Play
              onClick={() => handlePlayPause()}
              className='text-green-700 bg-white hover:text-white hover:bg-green-700 active:bg-green-700 active:text-white w-28 cursor-pointer rounded-md transition duration-500 shadow-sm'
            />
          ) : (
            <Pause
              onClick={() => handlePlayPause()}
              className='text-orange-600 bg-white hover:text-white hover:bg-orange-600 active:text-white active:bg-orange-600 w-28 cursor-pointer rounded-md transition duration-500 shadow-sm'
            />
          )}
          <Reset
            onClick={() => handleReset()}
            className='text-red-700 bg-white hover:text-white hover:bg-red-700 active:text-white active:bg-red-700 w-28 cursor-pointer rounded-md transition duration-500 shadow-sm'
          />
        </div>
      </div>
    </div>
  );
}
