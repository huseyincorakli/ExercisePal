import React, { useState, useEffect, useRef } from "react";
import { PlayArrow, Pause, PublishedWithChanges } from "@mui/icons-material";

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // JSON dosyasından müzik verilerini almak için fetch API'sini kullanın
    fetch("src/music/music.json")
      .then((response) => response.json())
      .then((data) => setMusicList(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (musicList.length > 0 && currentMusic === null) {
      // Rastgele bir müzik seç
      const randomIndex = Math.floor(Math.random() * musicList.length);
      setCurrentMusic(musicList[randomIndex]);
    }
  }, [musicList, currentMusic]);

  const handleTogglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    handleTogglePlay();
  };

  const handleRandomMusic = () => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    setCurrentMusic(musicList[randomIndex]);
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-sm mx-auto ">
      <audio
        ref={audioRef}
        src={currentMusic?.music_url}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 mx-1 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </button>
        <button
          className="bg-orange-400 mr-4 hover:bg-orange-600 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={handleRandomMusic}
        >
          <PublishedWithChanges />
        </button>
        <div>{currentMusic?.music_name}</div>
        <div className="ml-auto">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className="bg-gray-200 h-4 mt-2 rounded">
        <div
          className="bg-blue-500 h-4 rounded"
          style={{
            width: currentTime && duration ? `${(currentTime / duration) * 100}%` : '0%',
          }}
        ></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
