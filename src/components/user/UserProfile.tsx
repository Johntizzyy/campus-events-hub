import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  bio: string;
  university: string;
  department: string;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    eventReminders: boolean;
  };
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: "John Doe",
    email: "john@university.edu.ng",
    phone: "+234 123 456 7890",
    avatar: null,
    bio: "Computer Science student passionate about tech events.",
    university: "University of Lagos",
    department: "Computer Science",
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      eventReminders: true,
    },
  });

  const handleSaveProfile = async () => {
    // Add profile update logic here
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add image upload logic here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative h-32 bg-primary-600">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              {profileData.avatar ? (
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-white" />
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 cursor-pointer">
                  <CameraIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 text-white"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="pt-16 px-8 pb-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                {/* Add similar fields for email, phone, university, department */}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                disabled={!isEditing}
                rows={4}
                className="input-field"
              />
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={profileData.preferences.emailNotifications}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        preferences: {
                          ...profileData.preferences,
                          emailNotifications: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="emailNotifications"
                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    Email Notifications
                  </label>
                </div>
                {/* Add similar toggles for other preferences */}
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Security
              </h3>
              <button
                type="button"
                className="flex items-center text-sm text-primary-600 hover:text-primary-500"
              >
                <KeyIcon className="w-5 h-5 mr-2" />
                Change Password
              </button>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button onClick={handleSaveProfile} className="btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
