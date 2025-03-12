import { format } from 'date-fns'; // Import date-fns for formatting

const PendingInvitationsModal = ({
  isOpen,
  onClose,
  invitations,
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-950 w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">
          Pending Invitations
        </h2>

        {invitations.length === 0 ? (
          <p className="text-gray-400 text-center">No pending invitations.</p>
        ) : (
          <ul className="space-y-4">
            {invitations.map(
              ({ id, group, senderUsername, invitationDate }) => (
                <li
                  key={id}
                  className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-white font-medium">{group.name}</p>
                    <p className="text-gray-400 text-sm">
                      Invited by{' '}
                      <span className="font-semibold">{senderUsername}</span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      {format(new Date(invitationDate), 'dd MMM yyyy, hh:mm a')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onAccept(id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onReject(id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PendingInvitationsModal;
