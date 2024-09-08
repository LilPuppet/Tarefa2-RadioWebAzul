'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import musicData, { Music } from './musicData';

export default function Page() {

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack: Music = musicData[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (playing) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex, playing, currentTrack.src]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing]);

  // Alterna entre play e pause
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

  return (
    <div className="container-custom">
      {/* Menu Lateral */}
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
  
      {/* Conteúdo Principal */}
      <div className="content-custom">
  
        {/* Frame 2: Capa do álbum */}
        <img src={currentTrack.cover} alt="Álbum" className="album-cover" />
  
        {/* Frame 3: Informações da faixa */}
        <div className="track-title">{currentTrack.title}</div>
        <div className="track-artist">{currentTrack.artist}</div>
  
        {/* Barra de progresso */}
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
  
        {/* Frame 4: Controles de reprodução */}
        <div className="controls-container">
          <FaBackward size={24} color="#B2B2B2" onClick={playPreviousTrack} />
          <div onClick={togglePlay} className="play-button">
            {playing ? <FaPause size={30} color="#fff" /> : <FaPlay size={30} color="#fff" />}
          </div>
          <FaForward size={24} color="#B2B2B2" onClick={playNextTrack} />
        </div>
  
        {/* Elemento de áudio escondido */}
        <audio ref={audioRef} />
      </div>
    </div>
  );
}
