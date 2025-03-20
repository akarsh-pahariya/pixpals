import { useEffect, useState } from 'react';
import { ArrowLeft, Edit, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePhoto from '../components/profile/ProfilePhoto';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileTimestamps from '../components/profile/ProfileTimestamps';
import PasswordChangeModal from '../components/profile/PasswordChangeModal';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/ui/Spinner';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import { updateUserInfo } from '../services/userService';
import {
  setIsLoadingToFalse,
  setIsLoadingToTrue,
} from '../store/slices/loadingSlice';
import { addUserInfo } from '../store/slices/userSlice';

const User = () => {
  useAuth();
  const user = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.loading.isLoading);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        name: user.name,
        email: user.email,
      });
      setPhotoPreview(user.profilePhoto.url);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoadingToTrue());
    try {
      const updatedFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedFormData.append(key, formData[key]);
      });

      if (photoFile) {
        updatedFormData.append('profilePhoto', photoFile);
      }

      const result = await updateUserInfo(updatedFormData);
      if (photoFile) {
        URL.revokeObjectURL(photoPreview);
        setPhotoFile(null);
      }
      dispatch(addUserInfo(result.data));
      showSuccessToast('User Info updated successfully');
    } catch (error) {
      dispatch(addUserInfo({ ...user }));
      showErrorToast(error.message);
    }
    setIsEditing(false);
    dispatch(setIsLoadingToFalse());
  };

  const handlePasswordSubmit = (passwordData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return false;
    }
    console.log('Password update data:', passwordData);
    setShowPasswordModal(false);
    return true;
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  if (loading || !user) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-purple-950 p-4">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,#FF00FF,transparent_55%),radial-gradient(circle_at_75%_75%,#00FFFF,transparent_55%)]"></div>

      <div className="w-full max-w-3xl p-8 bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl relative backdrop-blur-sm z-10 bg-opacity-80">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex space-x-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-red-500/20 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <ProfileHeader />

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3 flex flex-col items-center space-y-6">
            <ProfilePhoto
              photoUrl={photoPreview}
              userName={user.name}
              isEditing={isEditing}
              onPhotoChange={handlePhotoChange}
            />

            <ProfileTimestamps
              createdAt={user.createdAt}
              updatedAt={user.updatedAt}
            />
          </div>

          <div className="md:w-2/3">
            <ProfileForm
              user={user}
              formData={formData}
              isEditing={isEditing}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setIsEditing={setIsEditing}
              setFormData={setFormData}
              setPhotoPreview={setPhotoPreview}
              showPasswordModal={() => setShowPasswordModal(false)}
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
            />
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordChangeModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </div>
  );
};

export default User;
