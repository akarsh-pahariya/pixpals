// src/components/profile/ProfilePhoto.jsx
import { Camera, UserIcon } from 'lucide-react';

const ProfilePhoto = ({ photoUrl, userName, isEditing, onPhotoChange }) => {
  return (
    <div className="relative inline-block">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-xl shadow-purple-500/10">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-white" />
          </div>
        )}
      </div>

      {isEditing && (
        <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors shadow-lg transform translate-x-0 translate-y-0">
          <Camera className="w-5 h-5 text-white" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPhotoChange}
          />
        </label>
      )}
    </div>
  );
};

export default ProfilePhoto;
