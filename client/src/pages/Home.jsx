import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
  ChevronUp,
  FolderLock,
  Image,
  MonitorSmartphone,
  Share2,
  Users,
} from 'lucide-react';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
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
      <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="max-w-4xl relative z-10">
          <div className="mb-8">
            <img
              src="/pixpals-logo-1.png"
              alt="PixPals Logo"
              className="h-20 w-auto mx-auto"
            />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              PixPals
            </h1>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Friendship through{' '}
            <span className="text-[#8B5CF6]">every frame</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your personal gallery to relive moments and strengthen bonds with
            the people who matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Join the Community <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-[#4C1D95] hover:bg-[#4C1D95]/20 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0C0C0C] to-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              More Than Just{' '}
              <span className="text-[#8B5CF6]">Photo Sharing</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              We've built PixPals to help you stay connected through shared
              memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FolderLock className="text-[#8B5CF6] w-6 h-6" />,
                title: 'Shared Spaces',
                desc: "Private groups for your closest circles to share life's moments together.",
              },
              {
                icon: <Image className="text-[#8B5CF6] w-6 h-6" />,
                title: 'Image Management',
                desc: 'Advanced tools to organize, tag, and search through your photo collection.',
              },
              {
                icon: <Users className="text-[#8B5CF6] w-6 h-6" />,
                title: 'Group Management',
                desc: 'Create and manage multiple groups for different circles of friends and family.',
              },
              {
                icon: <MonitorSmartphone className="text-[#8B5CF6] w-6 h-6" />,
                title: 'Anywhere Access',
                desc: 'Your photos available on all devices, always in sync.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#181818] p-8 rounded-2xl border border-[#2A2A2A] hover:border-purple-900/50 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-[#4C1D95]/20 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Sharing in <span className="text-[#8B5CF6]">Minutes</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Getting your memories organized and shared has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-8 h-8 text-white" />,
                title: 'Create Your Space',
                desc: 'Set up your personal or group gallery in seconds.',
              },
              {
                icon: <Image className="w-8 h-8 text-white" />,
                title: 'Upload Your Memories',
                desc: 'Drag and drop photos or import from your devices.',
              },
              {
                icon: <Share2 className="w-8 h-8 text-white" />,
                title: 'Connect and Share',
                desc: 'Invite friends and start building memories together.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#4C1D95] to-[#6D28D9] rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0C0C0C]">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/pixpals-logo-1.png"
            alt="PixPals Logo"
            className="h-16 w-auto mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Strengthen Your Connections?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands already sharing their journey, one frame at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-[#4C1D95] hover:bg-[#4C1D95]/20 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
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
