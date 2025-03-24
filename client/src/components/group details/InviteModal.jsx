import { User, Plus, X } from 'lucide-react';

const InviteModal = ({
  isOpen,
  onClose,
  onSubmit,
  inviteUsername,
  setInviteUsername,
  inviteUsersList,
  onAddUser,
  onRemoveUser,
  onKeyDown,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md text-white backdrop-blur-sm bg-opacity-80 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content */}
        {/* ... existing modal content ... */}
      </div>
    </div>
  );
};

export default InviteModal;
