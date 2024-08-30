import React, { useState } from 'react';
import { createPlaylist } from '../../services/playlistService';

type PlaylistModalProps = {
  show: boolean;
  onClose: () => void;
  onCreate: () => void; // Callback para refrescar las playlists después de crear una nueva
};

const CreatePlaylistModal: React.FC<PlaylistModalProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const playlistData = { name, description };
      await createPlaylist(playlistData, imageFile);
      onCreate(); // Refrescar las playlists
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Failed to create playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#2b2e37] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Playlist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Playlist Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
              required
            />
          </div>
          <div>
            <label className="block text-white">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
          <div>
            <label className="block text-white">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Playlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
