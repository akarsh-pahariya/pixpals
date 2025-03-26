import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#1A1A1A] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/pixpals-logo-1.png"
            alt="PixPals Logo"
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              PixPals
            </h1>
            <p className="text-xs text-gray-400 italic">
              Friendship through every frame
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
