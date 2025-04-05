import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#4C1D95]">
          Welcome to PixPals
        </h1>
        <p className="text-gray-400 text-lg">
          A powerful tool for sharing images with your friends by making groups
        </p>
      </header>

      {/* Features Section */}
      <section className="max-w-5xl w-full mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Face Detection</h3>
            <p className="text-gray-400 text-sm">
              Automatically detect multiple faces in uploaded images with high
              accuracy.
            </p>
          </div>
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Group Management</h3>
            <p className="text-gray-400 text-sm">
              Create and manage groups to organize your images and collaborate
              with others.
            </p>
          </div>
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Secure Access</h3>
            <p className="text-gray-400 text-sm">
              Enjoy secure login and registration to keep your data safe and
              private.
            </p>
          </div>
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Image Previews</h3>
            <p className="text-gray-400 text-sm">
              Preview uploaded images and detected faces before saving them to
              your groups.
            </p>
          </div>
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
            <p className="text-gray-400 text-sm">
              Get real-time updates on group activities and image uploads.
            </p>
          </div>
          <div className="p-6 bg-[#181818] border border-[#2A2A2A] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
            <p className="text-gray-400 text-sm">
              Access the platform from any device, including laptops and mobile
              devices.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="max-w-5xl w-full mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-[16/9] bg-[#121212] border border-[#2A2A2A] rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">Screenshot 1 Placeholder</p>
          </div>
          <div className="aspect-[16/9] bg-[#121212] border border-[#2A2A2A] rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">Screenshot 2 Placeholder</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6">Get Started</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-[#4C1D95] text-white rounded-lg hover:bg-[#5B21B6] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" /> Login
            </div>
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" /> Register
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
