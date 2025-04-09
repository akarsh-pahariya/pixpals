// PaginationControls component
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const PaginationControls = ({ pageNumber, totalPages, setPageNumber }) => {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className={`py-2 px-4 rounded-lg text-white transition-all duration-300 ${
            pageNumber <= 1
              ? 'bg-gray-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transform hover:scale-105'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Previous
          </div>
        </button>

        <span className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          Page {pageNumber} of {totalPages === 0 ? 1 : totalPages}
        </span>

        <button
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={pageNumber >= totalPages}
          className={`py-2 px-4 rounded-lg text-white transition-all duration-300 ${
            pageNumber >= totalPages
              ? 'bg-gray-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 transform hover:scale-105'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="py-2 px-4 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
      >
        <div className="flex items-center justify-center gap-2">
          <ArrowUp className="w-4 h-4" /> Back to Top
        </div>
      </button>
    </div>
  );
};

export default PaginationControls;
