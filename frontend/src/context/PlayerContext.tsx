import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Track = {
  url: string;
  name: string;
  artist: string;
  photo: string;
};

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  hasNextTrack: boolean;
  hasPrevTrack: boolean;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setTrackList: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const currentTrack = currentTrackIndex !== null ? trackList[currentTrackIndex] : null;

  const playTrack = (track: Track) => {
    const index = trackList.findIndex(t => t.url === track.url);
    if (index !== -1) {
      setCurrentTrackIndex(index);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex < trackList.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const hasNextTrack = currentTrackIndex !== null && currentTrackIndex < trackList.length - 1;
  const hasPrevTrack = currentTrackIndex !== null && currentTrackIndex > 0;

  // Persist the state across component mounts/unmounts
  useEffect(() => {
    const savedState = localStorage.getItem('playerState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setTrackList(state.trackList);
      setCurrentTrackIndex(state.currentTrackIndex);
      setIsPlaying(state.isPlaying);
      setCurrentTime(state.currentTime);
      setDuration(state.duration);
      setVolume(state.volume);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playerState', JSON.stringify({
      trackList,
      currentTrackIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
    }));
  }, [trackList, currentTrackIndex, isPlaying, currentTime, duration, volume]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        togglePlayPause,
        nextTrack,
        prevTrack,
        hasNextTrack,
        hasPrevTrack,
        setCurrentTime,
        setDuration,
        setVolume,
        setTrackList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
