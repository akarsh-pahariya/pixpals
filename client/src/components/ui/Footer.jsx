import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
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

        <div className="flex space-x-6 text-md">
          Made by&nbsp;
          <Link
            to="https://github.com/akarsh-pahariya/multi-face-identifier"
            className="hover:text-gray-300 transition-colors"
          >
            Akarsh
          </Link>
        </div>

        <div className="text-xs text-gray-500 mt-4 md:mt-0">
          © {new Date().getFullYear()} PixPals. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
