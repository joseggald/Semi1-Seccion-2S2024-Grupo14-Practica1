import React, { useState, useEffect } from 'react';
import { uploadImageToS3, uploadSongToS3 } from '../../services/s3Service';

interface SongModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (songData: any) => void;
  songData: any;
  setSongData: (data: any) => void;
  title: string;
}

const SongModal: React.FC<SongModalProps> = ({ show, onClose, onSubmit, songData, setSongData, title }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  useEffect(() => {
    if (songData && songData.duration) {
      if (typeof songData.duration === 'string') {
        const parts = songData.duration.split(':');
        setMinutes(parts[1] || '0');
        setSeconds(parts[2] || '0');
      } else {
        setMinutes(String(songData.duration.minutes) || '0');
        setSeconds(String(songData.duration.seconds) || '0');
      }
    } else {
      setMinutes('0');
      setSeconds('0');
    }
  }, [songData?.duration]);

  if (!show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSongData({ ...songData, [field]: file });
    } else {
      setSongData({ ...songData, [field]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      setError(null);
      let songPhotoUrl = songData.photo;
      let songFileUrl = songData.mp3_file;

      // Subir nueva imagen solo si se selecciona una nueva
      if (songData.photo instanceof File) {
        const uploadResponse = await uploadImageToS3(songData.photo);
        songPhotoUrl = uploadResponse.url;
      }

      // Subir nuevo archivo de canción solo si se selecciona uno nuevo
      if (songData.mp3_file instanceof File) {
        const uploadResponse = await uploadSongToS3(songData.mp3_file);
        songFileUrl = uploadResponse.url;
      }

      const finalSongData = {
        name: songData.name || '',
        photo: songPhotoUrl || songData.photo, // Usa la nueva URL o la existente
        duration: `0:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`,
        artist_name: songData.artist_name || '',
        mp3_file: songFileUrl || songData.mp3_file, // Usa la nueva URL o la existente
      };

      onSubmit(finalSongData);
      onClose();
    } catch (error) {
      console.error('Error al guardar la canción:', error);
      setError('Failed to save the song. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2b2e37] p-6 rounded-lg shadow-lg max-w-lg w-full text-white">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Song Name</label>
            <input
              type="text"
              value={songData?.name || ''}
              onChange={(e) => handleInputChange(e, 'name')}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
              placeholder="Enter the song name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Artist Name</label>
            <input
              type="text"
              value={songData?.artist_name || ''}
              onChange={(e) => handleInputChange(e, 'artist_name')}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
              placeholder="Enter the artist's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                max="59"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 text-white w-1/2"
              />
              <input
                type="number"
                min="0"
                max="59"
                placeholder="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 text-white w-1/2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Song Image</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, 'photo')}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Song File (MP3)</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, 'mp3_file')}
              className="p-2 rounded-lg bg-gray-800 text-white w-full"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
            disabled={uploading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongModal;
