
type Playlist = {
  id: string;
  name: string;
  description: string;
  photo: string;
};

type PlaylistModalProps = {
  show: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onAddToPlaylist: (playlistId: string) => void;
};

const PlaylistModal: React.FC<PlaylistModalProps> = ({ show, onClose, playlists, onAddToPlaylist }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#2b2e37] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-white text-2xl font-bold mb-4">Select Playlist</h2>
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="flex items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition" onClick={() => onAddToPlaylist(playlist.id)}>
              <img src={playlist.photo} alt={playlist.name} className="w-12 h-12 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="text-white font-semibold">{playlist.name}</h3>
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
