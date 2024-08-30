
const NavItem = ({ iconSrc, iconAlt, text, textColor, isActive }: { iconSrc: string; iconAlt: string; text: string; textColor: string; isActive: boolean }) => {
  return (
    <div
      className={`flex items-center px-2 py-1 rounded-full cursor-pointer transition-transform transform hover:scale-95 
        ${isActive ? 'bg-[#2b2e37]' : 'bg-transparent'} 
        hover:bg-[#2b2e37]`}
      style={{ height: '38px' }}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        className="w-6 h-6" // Ancho y alto uniformes para todos los íconos
        style={{ minWidth: '30px', minHeight: '30px' }} // Asegura el tamaño mínimo
      />
      <div className={`ml-1 text-[14px] ${textColor} transition-colors duration-200`}>
        {text}
      </div>
    </div>
  );
};

export default NavItem;
