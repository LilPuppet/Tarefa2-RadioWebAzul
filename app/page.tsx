'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import musicData, { Music } from './musicData';

export default function Page() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // Estado para controlar o volume
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack: Music = musicData[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.play(); // Começar automaticamente a tocar quando mudar de faixa
      setPlaying(true); // Garantir que o estado de playing seja verdadeiro após a mudança de faixa
    }
  }, [currentTrackIndex, currentTrack.src]);
  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Atualiza o volume de forma independente
    }
  }, [volume]); // Atualiza o volume sempre que ele for alterado

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };
  

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="container-custom">
      <aside className="sidebar-custom">
        <h2>Playlist</h2>
        <ul>
          {musicData.map((track, index) => (
            <li
              key={index}
              onClick={() => handleSelectTrack(index)}
              className={`list-item-custom ${currentTrackIndex === index ? 'bg-gray-700' : 'bg-transparent'}`}
            >
              <strong>{track.title}</strong> by {track.artist}
            </li>
          ))}
        </ul>
      </aside>
  
      <div className="content-custom">
        <img src={currentTrack.cover} alt="Álbum" className="album-cover" />
  
        <div className="track-title">{currentTrack.title}</div>
        <div className="track-artist">{currentTrack.artist}</div>
  
        <div className="progress-container">
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={audioRef.current?.duration || 0}
            value={progress}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value);
                setProgress(parseFloat(e.target.value));
              }
            }}
          />
          <span className="progress-time">
            {formatTime(progress)} / {formatTime(audioRef.current?.duration || 0)}
          </span>
        </div>
  
        <div className="controls-container">
          <FaBackward size={24} color="#B2B2B2" onClick={playPreviousTrack} />
          <div onClick={togglePlay} className="play-button">
            {playing ? <FaPause size={30} color="#fff" /> : <FaPlay size={30} color="#fff" />}
          </div>
          <FaForward size={24} color="#B2B2B2" onClick={playNextTrack} />
        </div>

        {/* Volume control estilizado */}
        <div className="volume-container flex items-center mt-4">
          {volume === 0 ? (
            <FaVolumeMute size={24} color="#B2B2B2" />
          ) : (
            <FaVolumeUp size={24} color="#B2B2B2" />
          )}
          <div className="volume-bar-container relative flex items-center ml-4">
            <input
              type="range"
              className="volume-bar"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>

        <audio ref={audioRef} onEnded={playNextTrack} />
      </div>
    </div>
  );
}
