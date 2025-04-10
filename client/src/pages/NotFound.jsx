import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl p-8 bg-[#181818] border border-[#2A2A2A] text-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-8xl md:text-9xl font-bold text-[#4C1D95]">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-6 text-white">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              The page you're looking for seems to have vanished into the
              digital void. Let's get you back on track!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-white bg-[#4C1D95] hover:bg-[#5B21B6] transition-all duration-200 shadow-lg shadow-[#4C1D95]/30"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-[#4C1D95]/20 rounded-lg"></div>
              <img
                src="/pixpals-logo.png"
                alt="404 Illustration"
                className="relative z-10 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
