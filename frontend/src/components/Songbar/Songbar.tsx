import React, { useState, useRef, useEffect } from 'react';
import favIcon from '../../assets/songbar/fav.svg';
import nextLeftIcon from '../../assets/songbar/next_left.svg';
import nextRightIcon from '../../assets/songbar/next_right.svg';
import playIcon from '../../assets/songbar/play.svg';
import pauseIcon from '../../assets/songbar/pause.svg';
import playlistIcon from '../../assets/songbar/playlist.svg';
import volumenIcon from '../../assets/songbar/volumen.svg';
import exampleAlbumCover from '../../assets/login/logo_app.jpg';
import loadingSpinner from '../../assets/songbar/loading_spinner.svg'; // Asegúrate de tener un ícono de carga

const Songbar = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/Alvaro+Diaz%2C+Sen+Senra+-+1000CANCIONES+(Official+Video).mp3');
    audio.preload = 'auto';
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying) {
        audio.play();
      }
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };

    const handleError = (e) => {
      console.error('Error al reproducir el audio:', e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => {
        console.error('Error al iniciar la reproducción:', e);
      });
      setIsPlaying(true);
    }
  };

  const handleSkip = async (seconds) => {
    const audio = audioRef.current;
    const newTime = Math.min(Math.max(0, audio.currentTime + seconds), duration);
    setIsLoading(true);
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = newTime;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error('Error al saltar en la pista:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleProgressMouseUp = async (e) => {
    if (isDragging) {
      updateProgress(e);
      setIsDragging(false);
      const audio = audioRef.current;
      setIsLoading(true);
      audio.pause();
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error al reproducir después del seek:', error);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateProgress = (e) => {
    const audio = audioRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className="bg-[#333842] bg-opacity-80 mb-3 mr-3 flex justify-between items-center p-4 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg select-none"
      onMouseUp={handleProgressMouseUp}
      onMouseLeave={() => isDragging && setIsDragging(false)}
    >
      <div className="flex items-center space-x-5">
        <img
          src={favIcon}
          alt="Favorite Icon"
          className="w-7 h-7 cursor-pointer"
        />
        <img
          src={nextLeftIcon}
          alt="Previous Icon"
          className="w-7 h-7 cursor-pointer"
          onClick={() => handleSkip(-15)}
        />
        <div className="relative">
          {isLoading && (
            <img
              src={loadingSpinner}
              alt="Loading..."
              className="absolute inset-0 w-8 h-8 animate-spin"
            />
          )}
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play/Pause Icon"
            className={`w-8 h-8 cursor-pointer ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={togglePlayPause}
            disabled={isLoading}
          />
        </div>
        <img
          src={nextRightIcon}
          alt="Next Icon"
          className="w-7 h-7 cursor-pointer"
          onClick={() => handleSkip(15)}
        />
        <img
          src={playlistIcon}
          alt="Playlist Icon"
          className="w-7 h-7 cursor-pointer"
        />
      </div>

      <div className="flex-grow mx-6 flex items-center space-x-4">
        <img
          src={exampleAlbumCover}
          alt="Album Cover"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="text-white leading-tight min-w-0">
          <div className="text-base font-semibold truncate">1000CANCIONES</div>
          <div className="text-xs text-gray-400 truncate">Álvaro Díaz, Sen Senra</div>
        </div>
        <div
          className="flex-grow mx-4 relative cursor-pointer"
          ref={progressRef}
          onMouseDown={handleProgressMouseDown}
          onMouseMove={handleProgressMouseMove}
        >
          <div className="bg-gray-600 h-2 w-full rounded-full">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <img
          src={volumenIcon}
          alt="Volume Icon"
          className="w-7 h-7 cursor-pointer"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="cursor-pointer w-24"
        />
      </div>
    </div>
  );
};

export default Songbar;
