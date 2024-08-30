import { useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';

const AudioPlayer = () => {
  const { currentTrack, isPlaying, setCurrentTime, setDuration, volume } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (currentTrack) {
      // Solo cambiar la fuente si es una nueva canción
      if (audioRef.current.src !== currentTrack.url) {
        audioRef.current.src = currentTrack.url;
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        audioRef.current.volume = volume;

        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current?.duration || 0);
        };

        if (isPlaying) {
          audioRef.current.play().catch((error) => console.error('Error al reproducir:', error));
        }
      } else if (isPlaying) {
        // Si es la misma canción y se debe reproducir
        audioRef.current.play().catch((error) => console.error('Error al reproducir:', error));
      } else {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const updateCurrentTime = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };

      audioRef.current.addEventListener('timeupdate', updateCurrentTime);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
        }
      };
    }
  }, [setCurrentTime]);

  return null;
};

export default AudioPlayer;
