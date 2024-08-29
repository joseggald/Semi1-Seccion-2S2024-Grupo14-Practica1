import React, { createContext, useContext, useState } from 'react';

const SongContext = createContext();

export const useSong = () => {
  return useContext(SongContext);
};

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    localStorage.setItem('currentSong', JSON.stringify(songs[index]));
  };

  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    }
  };

  const prevSong = () => {
    if (currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    }
  };

  return (
    <SongContext.Provider value={{
      songs,
      setSongs,
      currentSong: songs[currentSongIndex],
      isPlaying,
      playSong,
      nextSong,
      prevSong,
      setIsPlaying,
    }}>
      {children}
    </SongContext.Provider>
  );
};