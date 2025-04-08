import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Smartphone,
  ChevronUp,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col">
      {/* Floating Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#4C1D95] hover:bg-[#5B21B6] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 to-transparent opacity-30"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              src="/pixpals-logo-1.png"
              alt="PixPals Logo"
              className="h-16 w-auto animate-pulse" // Added animation
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 animate-gradient">
              PixPals
            </h1>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Capture Life, Connect Hearts.
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-delay">
            Your personal gallery to relive moments and share them with the
            people you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/register"
              className="px-8 py-4 bg-[#4C1D95] hover:bg-[#5B21B6] text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-900/50 flex items-center justify-center gap-2"
            >
              Join the Community <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border border-[#4C1D95] hover:bg-[#4C1D95]/20 text-white rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0C0C0C] to-[#121212]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-[#8B5CF6]">PixPals</span> is Your Go-To
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the joy of sharing photos with privacy and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#181818] p-8 rounded-xl border border-[#2A2A2A] hover:border-purple-900/50 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-[#4C1D95]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4C1D95]/40 transition-all duration-300">
                <Users className="text-[#8B5CF6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Shared Spaces</h3>
              <p className="text-gray-400">
                Connect with friends and family in dedicated photo groups.
              </p>
            </div>

            <div className="bg-[#181818] p-8 rounded-xl border border-[#2A2A2A] hover:border-purple-900/50 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-[#4C1D95]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4C1D95]/40 transition-all duration-300">
                <ShieldCheck className="text-[#8B5CF6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-gray-400">
                Keep your memories safe with robust privacy controls.
              </p>
            </div>

            <div className="bg-[#181818] p-8 rounded-xl border border-[#2A2A2A] hover:border-purple-900/50 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-[#4C1D95]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4C1D95]/40 transition-all duration-300">
                <Layers className="text-[#8B5CF6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Organized Galleries
              </h3>
              <p className="text-gray-400">
                Effortlessly manage your photos with intuitive gallery layouts.
              </p>
            </div>

            <div className="bg-[#181818] p-8 rounded-xl border border-[#2A2A2A] hover:border-purple-900/50 transition-all duration-300 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-[#4C1D95]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4C1D95]/40 transition-all duration-300">
                <Smartphone className="text-[#8B5CF6] w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anywhere Access</h3>
              <p className="text-gray-400">
                Access your PixPals from any device, keeping your memories
                close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Getting Started with{' '}
              <span className="text-[#8B5CF6]">PixPals</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Simple steps to bring your photo memories to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Space</h3>
              <p className="text-gray-400">
                Set up your personal or group gallery with ease.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Upload Your Memories
              </h3>
              <p className="text-gray-400">
                Add photos and share them instantly with your circle.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect and Share</h3>
              <p className="text-gray-400">
                Invite friends and family to join your photo journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#121212] to-[#0C0C0C]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/pixpals-logo-1.png"
              alt="PixPals Logo"
              className="h-12 w-auto animate-pulse"
            />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 animate-gradient">
              PixPals
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Sharing?
          </h3>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join PixPals today and keep your memories alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/register"
              className="px-8 py-4 bg-[#4C1D95] hover:bg-[#5B21B6] text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-900/50 flex items-center justify-center gap-2"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border border-[#4C1D95] hover:bg-[#4C1D95]/20 text-white rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
