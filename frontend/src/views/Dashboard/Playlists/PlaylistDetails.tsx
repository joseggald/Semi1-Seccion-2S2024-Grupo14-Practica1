import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSongsInPlaylist, deletePlaylist, deleteSongFromPlaylist } from '../../../services/playlistService';
import { getMyFavorites, addFavorite, removeFavorite } from '../../../services/songService';
import { usePlayer } from '../../../context/PlayerContext';
import playIcon from '../../../assets/songbar/play.svg';
import favIcon from '../../../assets/songbar/favTrue.svg';
import nofavIcon from '../../../assets/songbar/favFalse.svg';
import deleteIcon from '../../../assets/songbar/delete.svg';
import SuccessMessage from '../../../components/Utility/SuccessMessage';
import ConfirmationModal from '../../../components/Utility/ConfirmationModal';

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

type PlaylistSong = {
  playlist_id: string;
  song_id: string;
};

const PlaylistDetails: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<PlaylistSong[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const { playTrack, currentTrack, isPlaying, setTrackList } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const playlistData = await getSongsInPlaylist(playlistId || '');
        setPlaylistSongs(playlistData);
        console.log(playlistSongs);
        const allSongs = await getMyFavorites();
        const filteredSongs = allSongs.filter((song:any) =>
          playlistData.some((ps:any) => ps.song_id === song.id)
        );
        setSongs(filteredSongs);
        
      } catch (error) {
        console.error('Failed to fetch playlist songs:', error);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId, setTrackList]);

  const handlePlaySong = (song: Song) => {
    if (currentTrack?.name !== song.name) {
      setTrackList(songs.map(song => ({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration.minutes * 60 + song.duration.seconds,
      })));
      playTrack({
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo
      });
    } else if (!isPlaying) {
      playTrack({
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo
      });
    }
  };

  const handleToggleFavorite = async (song: Song) => {
    try {
      const updatedSong = { ...song, is_favorite: !song.is_favorite };
      setSongs((prevSongs) =>
        prevSongs.map((s) => (s.id === song.id ? updatedSong : s))
      );
  
      if (song.is_favorite) {
        await removeFavorite(song.id);
      } else {
        await addFavorite(song.id);
      }
  
      setSuccessMessage(`Song ${updatedSong.is_favorite ? 'added to' : 'removed from'} favorites!`);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleDeleteSong = async () => {
    try {
      if (songToDelete) {
        await deleteSongFromPlaylist(playlistId || '', songToDelete.id);
        const updatedSongs = songs.filter(song => song.id !== songToDelete.id);
        setSongs(updatedSongs);
        setTrackList(updatedSongs.map(song => ({
          id: song.id,
          url: song.mp3_file,
          name: song.name,
          artist: song.artist_name,
          photo: song.photo,
          duration: song.duration.minutes * 60 + song.duration.seconds,
        })));
        setShowDeleteConfirmation(false);
        setSongToDelete(null);
        setSuccessMessage('Song removed from playlist successfully!');
      }
    } catch (error) {
      console.error('Failed to remove song from playlist:', error);
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlistId || '');
      setSuccessMessage('Playlist deleted successfully!');
      navigate('/playlists');
    } catch (error) {
      console.error('Failed to delete playlist:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white">Playlist Details</h1>
      <p className="text-white mt-4">Songs in this playlist</p>
      <div className="bg-[#2b2e37] p-4 rounded-lg shadow-lg mt-4">
        {songs.length > 0 ? (
          <div className="grid grid-cols-12 gap-4 p-4 text-white font-semibold">
            <span className="col-span-1 text-center">#</span>
            <span className="col-span-4">Title</span>
            <span className="col-span-3">Artist</span>
            <span className="col-span-2 text-center">Duration</span>
            <span className="col-span-2 text-center">Actions</span>
          </div>
        ) : (
          <p className="text-white text-center">This playlist is empty.</p>
        )}
        <div className="divide-y divide-gray-700">
          {songs.map((song, index) => (
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
                  onClick={() => handleToggleFavorite(song)}
                  className={`transition-transform transform hover:scale-110 active:scale-95 ${song.is_favorite ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  <img src={song.is_favorite ? favIcon : nofavIcon} alt="Favorite" className="w-6 h-8" />
                </button>
                <button
                  onClick={() => { setSongToDelete(song); setShowDeleteConfirmation(true); }}
                  className="text-red-500 transition-transform transform hover:scale-110 active:scale-95"
                >
                  <img src={deleteIcon} alt="Remove from Playlist" className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleDeletePlaylist}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Delete Playlist
        </button>
      </div>

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />}

      <ConfirmationModal
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteSong}
        title="Remove Song from Playlist"
        message="Are you sure you want to remove this song from the playlist? This action cannot be undone."
      />
    </div>
  );
};

export default PlaylistDetails;
