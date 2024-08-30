import React, { useEffect, useState } from 'react';
import { getMyFavorites, removeFavorite } from '../../../services/songService';
import { getAllPlaylists, addToPlaylist } from '../../../services/playlistService';
import { usePlayer } from '../../../context/PlayerContext';
import playIcon from '../../../assets/songbar/play.svg';
import favIcon from '../../../assets/songbar/favTrue.svg';
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

const MyFavourites: React.FC = () => {
  const [favouriteSongs, setFavouriteSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { playTrack, currentTrack, isPlaying, setTrackList } = usePlayer();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data: Song[] = await getMyFavorites();
        const favoriteOnly = data.filter(song => song.is_favorite);
        setFavouriteSongs(favoriteOnly);
        setTrackList(favoriteOnly.map(song => ({
          id: song.id,
          url: song.mp3_file,
          name: song.name,
          artist: song.artist_name,
          photo: song.photo,
          duration: song.duration.minutes * 60 + song.duration.seconds,
        })));
      } catch (error) {
        console.error('Failed to fetch favorite songs:', error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const data: Playlist[] = await getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    };

    fetchFavorites();
    fetchPlaylists();
  }, [setTrackList]);

  const handlePlaySong = (song: Song) => {
    if (currentTrack?.id !== song.id) {
      playTrack({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration.minutes * 60 + song.duration.seconds,
      });
    } else if (!isPlaying) {
      playTrack({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration.minutes * 60 + song.duration.seconds,
      });
    }
  };

  const handleRemoveFavorite = async (songId: string) => {
    try {
      await removeFavorite(songId);
      const updatedFavorites = favouriteSongs.filter(song => song.id !== songId);
      setFavouriteSongs(updatedFavorites);
      setTrackList(updatedFavorites.map(song => ({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration.minutes * 60 + song.duration.seconds,
      })));
      setSuccessMessage('Song removed from favorites successfully!');
    } catch (error) {
      console.error('Failed to remove song from favorites:', error);
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (selectedSong) {
      addToPlaylist(playlistId, selectedSong.id)
        .then(() => {
          setSuccessMessage('Song added to playlist successfully!');
          setShowPlaylistModal(false);
        })
        .catch((error) => {
          console.error('Failed to add song to playlist:', error);
        });
    }
  };

  const openPlaylistModal = (song: Song) => {
    setSelectedSong(song);
    setShowPlaylistModal(true);
  };

  // Filtrado de canciones basado en el término de búsqueda
  const filteredSongs = favouriteSongs.filter(song => 
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white">My Favourites</h1>
      <p className="text-white mt-4">Your favourite songs</p>

      <div className="flex items-center mb-4">
        <input 
          type="text"
          placeholder="Search by title or artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg bg-gray-600 text-white w-1/2"
        />
      </div>

      <div className="bg-[#2b2e37] p-4 rounded-lg shadow-lg mt-4">
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-12 gap-4 p-4 text-white font-semibold">
            <span className="col-span-1 text-center">#</span>
            <span className="col-span-4">Title</span>
            <span className="col-span-3">Artist</span>
            <span className="col-span-2 text-center">Duration</span>
            <span className="col-span-2 text-center">Actions</span>
          </div>
        ) : (
          <p className="text-white text-center">No favorite songs found.</p>
        )}
        <div className="divide-y divide-gray-700">
          {filteredSongs.map((song, index) => (
            <div key={song.id} className="grid grid-cols-12 gap-4 p-4 items-center text-white hover:bg-gray-800 transition">
              <span className="col-span-1 text-center">{index + 1}</span>
              <div className="col-span-4 flex items-center">
                <img src={song.photo} alt={song.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                <span className="truncate">{song.name}</span>
              </div>
              <span className="col-span-3 truncate">{song.artist_name}</span>
              <span className="col-span-2 text-center">
                {song.duration.minutes.toString().padStart(2, '0')}:
                {song.duration.seconds.toString().padStart(2, '0')}
              </span>
              <div className="col-span-2 flex justify-center space-x-4">
                <button
                  onClick={() => handlePlaySong(song)}
                  className="text-green-500 transition-transform transform hover:scale-110 active:scale-95"
                >
                  <img src={playIcon} alt="Play" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleRemoveFavorite(song.id)}
                  className="text-red-500 transition-transform transform hover:scale-110 active:scale-95"
                >
                  <img src={favIcon} alt="Remove from Favorites" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => openPlaylistModal(song)}
                  className="text-blue-500 transition-transform transform hover:scale-110 active:scale-95"
                >
                  <img src={playlistIcon} alt="Add to Playlist" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default MyFavourites;
