import { Trash2 } from 'lucide-react';

const DeleteActionButtons = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDelete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <button
        onClick={onSelectAll}
        className="w-full sm:w-auto px-5 py-3 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all duration-200"
      >
        {selectedCount === totalCount ? 'Deselect All ' : 'Select All '}(
        {selectedCount}/{totalCount})
      </button>

      <button
        onClick={onDelete}
        disabled={selectedCount === 0}
        className={`w-full sm:w-auto px-5 py-3 rounded-lg text-white flex items-center justify-center gap-2 transition-all duration-200 ${
          selectedCount === 0
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        <Trash2 className="w-5 h-5" />
        Delete Selected ({selectedCount})
      </button>
    </div>
  );
};

export default DeleteActionButtons;
