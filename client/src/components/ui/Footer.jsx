import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white shadow-md mt-auto">
      <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/pixpals-logo-1.png"
              alt="PixPals Logo"
              className="h-12 w-12 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold tracking-tight">PixPals</h1>
              <p className="text-sm text-white/70 italic">
                Friendship through every frame
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center  space-y-2">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Made by Akarsh</span>
            <a
              href="https://github.com/akarsh-pahariya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Akarsh"
              className="hover:text-gray-300 transition-colors p-2 rounded-full bg-gray-800"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/akarsh-pahariya-93155a240/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Akarsh"
              className="hover:text-gray-300 transition-colors p-2 rounded-full bg-gray-800"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <a
            href="https://github.com/akarsh-pahariya/pixpals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/70 hover:text-white transition-colors border-b border-gray-700 pb-1 md:text-right"
          >
            View Project Repository
          </a>
        </div>

        <div className="text-xs text-white/60 flex flex-col items-center md:items-end md:self-end space-y-1">
          <span>© {new Date().getFullYear()} PixPals.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
