import React, { useEffect, useState } from 'react';
import { getAllSongs, deleteSong, createSong, updateSong } from '../../../services/songService';
import { usePlayer } from '../../../context/PlayerContext';
import editIcon from '../../../assets/songbar/edit.svg';
import deleteIcon from '../../../assets/songbar/delete.svg';
import playIcon from '../../../assets/songbar/play.svg';
import SuccessMessage from '../../../components/Utility/SuccessMessage';
import ConfirmationModal from '../../../components/Utility/ConfirmationModal';
import SongModal from '../../../components/Modals/SongModal';

type Song = {
  id: string;
  name: string;
  photo: string;
  artist_name: string;
  duration: number;
  mp3_file: string;
};

const Administrator = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSong, setNewSong] = useState<Song>({ id: '', name: '', photo: '', artist_name: '', duration: 0, mp3_file: '' });
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { playTrack, currentTrack, isPlaying, setTrackList } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
        setFilteredSongs(data);
        setTrackList(data.map(song => ({
          id: song.id,
          url: song.mp3_file,
          name: song.name,
          artist: song.artist_name,
          photo: song.photo,
          duration: song.duration,
        })));
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };
    fetchSongs();
  }, [setTrackList]);

  const handlePlaySong = (song: Song) => {
    if (currentTrack?.id !== song.id) {
      playTrack({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration
      });
    } else if (!isPlaying) {
      playTrack({
        id: song.id,
        url: song.mp3_file,
        name: song.name,
        artist: song.artist_name,
        photo: song.photo,
        duration: song.duration
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (songToDelete) {
        await deleteSong(songToDelete.id);
        const updatedSongs = songs.filter(song => song.id !== songToDelete.id);
        setSongs(updatedSongs);
        setFilteredSongs(updatedSongs);
        setShowDeleteConfirmation(false);
        setSongToDelete(null);
        setSuccessMessage('Song deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete song:', error);
    }
  };

  const handleCreateSong = async (finalSongData) => {
    try {
      await createSong(finalSongData);
      setSuccessMessage('Song created successfully!');
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error('Failed to create song:', error);
    }
  };

  const handleEditSong = async (finalSongData) => {
    try {
      if (editingSong) {
        await updateSong(editingSong.id, finalSongData);
        setSuccessMessage('Song updated successfully!');
        window.location.reload(); // Refresh the page to reflect changes
      }
    } catch (error) {
      console.error('Failed to update song:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white">Administrator Dashboard</h1>
      <p className="text-white mt-4">Manage your songs</p>
      <div className="flex items-center justify-between mt-6 mb-4">
        <div className="flex items-center space-x-6">
          <button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
            Add New Song
          </button>
          <div className="flex items-center">
            <label htmlFor="search" className="text-white mr-2">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="By song or artist"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#2b2e37] p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-12 gap-4 p-4 text-white font-semibold">
          <span className="col-span-1 text-center">#</span>
          <span className="col-span-4">Title</span>
          <span className="col-span-3">Artist</span>
          <span className="col-span-2 text-center">Duration</span>
          <span className="col-span-2 text-center">Actions</span>
        </div>
        <div className="divide-y divide-gray-700">
          {filteredSongs.map((song, index) => (
            <div key={song.id} className="grid grid-cols-12 gap-4 p-4 items-center text-white hover:bg-gray-800 transition">
              <span className="col-span-1 text-center">{index + 1}</span>
              <div className="col-span-4 flex items-center">
                <img src={song.photo} alt={song.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
                <span className="truncate">{song.name}</span>
              </div>
              <span className="col-span-3 truncate">{song.artist_name}</span>
              <span className="col-span-2 text-center">{(song.duration.minutes).toString().padStart(2, '0')}:{(song.duration.seconds).toString().padStart(2, '0')}</span>
              <div className="col-span-2 flex justify-center space-x-4">
                  <button 
                    onClick={() => handlePlaySong(song)} 
                    className="text-green-500 transition-transform transform hover:scale-110 active:scale-95"
                  >
                    <img src={playIcon} alt="Play" className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => { setEditingSong(song); setShowEditModal(true); }} 
                    className="text-yellow-500 transition-transform transform hover:scale-110 active:scale-95"
                  >
                    <img src={editIcon} alt="Edit" className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => { setSongToDelete(song); setShowDeleteConfirmation(true); }} 
                    className="text-red-500 transition-transform transform hover:scale-110 active:scale-95"
                  >
                    <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
                  </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />}

      <SongModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSong}
        songData={newSong}
        setSongData={setNewSong}
        title="Add New Song"
      />

      <SongModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSong}
        songData={editingSong}
        setSongData={setEditingSong}
        title="Edit Song"
      />

      <ConfirmationModal
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        title="Delete Song"
        message="Are you sure you want to delete this song? This action cannot be undone."
      />
    </div>
  );
};

export default Administrator;
