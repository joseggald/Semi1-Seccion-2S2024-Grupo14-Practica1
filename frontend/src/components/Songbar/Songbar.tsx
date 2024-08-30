import { usePlayer } from '../../context/PlayerContext';
import favIcon from '../../assets/songbar/favFalse.svg';
import nextLeftIcon from '../../assets/songbar/next_left.svg';
import nextRightIcon from '../../assets/songbar/next_right.svg';
import playIcon from '../../assets/songbar/play.svg';
import pauseIcon from '../../assets/songbar/pause.svg';
import playlistIcon from '../../assets/songbar/playlist.svg';
import volumenIcon from '../../assets/songbar/volumen.svg';

const Songbar: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    currentTime, 
    duration, 
    setVolume, 
    volume, 
    nextTrack, 
    prevTrack,
    hasNextTrack,
    hasPrevTrack,
  } = usePlayer();

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="bg-[#333842] bg-opacity-80 mb-3 mr-3 flex justify-between items-center p-4 rounded-xl shadow-lg backdrop-filter backdrop-blur-lg select-none">
      <div className="flex items-center space-x-5">
        <img src={favIcon} alt="Favorite Icon" className="hidden w-7 h-7 cursor-pointer transition-transform transform hover:scale-110 active:scale-95" />
        <img 
          src={nextLeftIcon} 
          alt="Previous Icon" 
          className={`w-7 h-7 cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${!hasPrevTrack ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={hasPrevTrack ? prevTrack : undefined} 
        />
        <div className="relative">
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play/Pause Icon"
            className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 active:scale-95"
            onClick={togglePlayPause}
          />
        </div>
        <img 
          src={nextRightIcon} 
          alt="Next Icon" 
          className={`w-7 h-7 cursor-pointer transition-transform transform hover:scale-110 active:scale-95 ${!hasNextTrack ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={hasNextTrack ? nextTrack : undefined} 
        />
        <img src={playlistIcon} alt="Playlist Icon" className="hidden w-7 h-7 cursor-pointer transition-transform transform hover:scale-110 active:scale-95" />
      </div>

      <div className="flex-grow mx-6 flex items-center space-x-4">
        <img src={currentTrack.photo || 'https://via.placeholder.com/150'} alt="Album Cover" className="w-12 h-12 object-cover rounded-lg" />
        <div className="text-white leading-tight min-w-0">
          <div className="text-base font-semibold truncate">{currentTrack.name}</div>
          <div className="text-xs text-gray-400 truncate">{currentTrack.artist}</div>
        </div>
        <div className="flex-grow mx-4 relative cursor-pointer">
          <div className="bg-gray-600 h-2 w-full rounded-full">
            <div className="bg-white h-2 rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <img src={volumenIcon} alt="Volume Icon" className="w-7 h-7 cursor-pointer transition-transform transform hover:scale-110 active:scale-95" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="cursor-pointer w-24 transition-transform transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Songbar;