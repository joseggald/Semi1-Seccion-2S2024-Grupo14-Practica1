import React, { useEffect, useState } from 'react';
import { getAllPlaylists } from '../../../services/playlistService';
import { useNavigate } from 'react-router-dom';
import PlaylistModal from '../../../components/Modals/CreatePlaylistModal'; // Importa el modal

type Playlist = {
  id: string;
  name: string;
  description: string;
  photo: string;
};

const MyPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showModal, setShowModal] = useState(false); // Estado para manejar la visibilidad del modal
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const data = await getAllPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlists/${playlistId}`);
  };

  const handleCreate = () => {
    fetchPlaylists(); // Refrescar la lista de playlists después de crear una nueva
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white">My Playlists</h1>
      <button
        onClick={() => setShowModal(true)} // Mostrar el modal al hacer clic en el botón
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
      >
        Create New Playlist
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#2b2e37] p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <img src={playlist.photo} alt={playlist.name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold text-white">{playlist.name}</h2>
            <p className="text-gray-400 mt-2">{playlist.description}</p>
          </div>
        ))}
      </div>

      {/* Renderiza el modal */}
      <PlaylistModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate} // Refrescar la lista después de crear una nueva playlist
      />
    </div>
  );
};

export default MyPlaylists;
