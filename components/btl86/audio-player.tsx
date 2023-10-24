'use client';

import { useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  isPlayAudio: boolean,
  setPlayAudio: (play: boolean) => void;
}

export default function AudioPlayer({
  src,
  isPlayAudio,
  setPlayAudio
}: AudioPlayerProps) {
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  const handleLoadedData = () => {
    console.log("[handleLoadedData]")
    if (isPlayAudio) audioRef.current.play();
  };
  return (
    <div>
        <audio
          ref={audioRef}
          src={src}
          controls
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => setCurrentTime(audioRef?.current?.currentTime)}
          onEnded={() => setPlayAudio(false)}
        />
    </div>
  );
}
