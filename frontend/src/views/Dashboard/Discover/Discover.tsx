import React, { useEffect, useState } from 'react';
import { addToPlaylist } from '../../../services/playlistService';
import { getMyFavorites,addFavorite, removeFavorite } from '../../../services/songService';
import { usePlayer } from '../../../context/PlayerContext';
import playIcon from '../../../assets/songbar/play.svg';
import favTrueIcon from '../../../assets/songbar/favTrue.svg'; // Ícono de favorito activo
import favFalseIcon from '../../../assets/songbar/favFalse.svg'; // Ícono de favorito inactivo
import playlistIcon from '../../../assets/songbar/playlist.svg';
import SuccessMessage from '../../../components/Utility/SuccessMessage';
import PlaylistModal from '../../../components/Modals/PlaylistModal';


type Song = {
  id: string;
  name: string;
  photo: string;
  artist_name: string;
  duration: {
    minutes: number;
    seconds: number;
  };
  mp3_file: string;
  is_favorite: boolean;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  photo: string;
};

const Discover: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<any | null>(null);
  const [playlists] = useState<Playlist[]>([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { playTrack, setTrackList, currentTrack } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data: Song[] = await getMyFavorites();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
      setTrackList(shuffledSongs.map(song => ({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration.minutes * 60 + song.duration.seconds,
      })));
      setCurrentSong(shuffledSongs[0]);
    }
  }, [songs, setTrackList]);

  useEffect(() => {
    if (currentTrack) {
      setCurrentSong(currentTrack);
    }
  }, [currentTrack]);

  const handlePlaySong = () => {
    if (currentSong) {
      playTrack({
        url: currentSong.mp3_file,
        name: currentSong.name,
        artist: currentSong.artist_name,
        photo: currentSong.photo,
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (currentSong) {
      try {
        if (currentSong.is_favorite) {
          await removeFavorite(currentSong.id);
        } else {
          await addFavorite(currentSong.id);
        }
        const updatedSong = { ...currentSong, is_favorite: !currentSong.is_favorite };
        setCurrentSong(updatedSong);
        setSuccessMessage(`Song ${updatedSong.is_favorite ? 'added to' : 'removed from'} favorites successfully!`);
      } catch (error) {
        console.error('Failed to toggle favorite:', error);
      }
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (currentSong) {
      addToPlaylist(playlistId, currentSong.id)
        .then(() => {
          setSuccessMessage('Song added to playlist successfully!');
          setShowPlaylistModal(false);
        })
        .catch((error) => {
          console.error('Failed to add song to playlist:', error);
        });
    }
  };

  const openPlaylistModal = () => {
    setShowPlaylistModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white">Discover</h1>
      <p className="text-white mt-4">Discover new music</p>

      {currentSong && (
        <div className="bg-[#2b2e37] p-4 rounded-lg shadow-lg mt-4 text-white">
          <div className="flex items-center">
            <img src={currentSong.photo} alt={currentSong.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
            <div>
              <h3 className="text-2xl font-bold">{currentSong.name}</h3>
              <p className="text-xl">{currentSong.artist_name}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePlaySong}
              className="text-green-500 transition-transform transform hover:scale-110 active:scale-95"
            >
              <img src={playIcon} alt="Play" className="w-8 h-8" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className="transition-transform transform hover:scale-110 active:scale-95"
            >
              <img src={currentSong.is_favorite ? favTrueIcon : favFalseIcon} alt="Favorite" className="w-8 h-8" />
            </button>
            <button
              onClick={openPlaylistModal}
              className="transition-transform transform hover:scale-110 active:scale-95"
            >
              <img src={playlistIcon} alt="Add to Playlist" className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />}

      <PlaylistModal
        show={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        playlists={playlists}
        onAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
};

export default Discover;
