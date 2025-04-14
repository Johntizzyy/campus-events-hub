import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  CameraIcon,
  ArrowLeftOnRectangleIcon,
  PencilIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    phone: "",
    location: "",
    photoUrl: user?.photoUrl || "",
  });

  const profileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.photoUrl || null
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("File selected:", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log("Image loaded:", result.substring(0, 50) + "...");
        setProfileImage(result);
        setUserDetails((prev) => ({
          ...prev,
          photoUrl: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Log the current profile image value
  console.log("Current profile image:", profileImage?.substring(0, 50) + "...");

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement API call to save user details
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-700"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    setProfileImage(null);
                  }}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  {userDetails.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-600 transition-colors"
                title="Change profile picture"
              >
                <CameraIcon className="h-3 w-3" />
              </button>
              <input
                type="file"
                ref={profileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{userDetails.name}</h2>
              <div className="flex items-center text-sm text-gray-300">
                <span>{userDetails.email}</span>
                <button
                  className="ml-2 p-1 hover:text-white transition-colors"
                  title="Copy email"
                >
                  <ClipboardIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Profile Information
            </h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <PencilIcon className="h-4 w-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userDetails.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userDetails.phone || "Not provided"}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userDetails.location}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userDetails.location || "Not provided"}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Account Type
                </label>
                <p className="text-gray-900 dark:text-white capitalize">
                  {user?.userType || "Not specified"}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={userDetails.bio}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {userDetails.bio || "No bio provided"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
