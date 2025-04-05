import React, { useEffect, useState } from "react";
import { useSocial } from "../../contexts/SocialContext";
import { UserProfile as UserProfileType } from "../../types/social";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

interface UserProfileProps {
  userId: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { userProfile, loading, error, fetchUserProfile } = useSocial();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfileType>>(
    {}
  );

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId, fetchUserProfile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(userProfile || {});
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to update profile
      // await api.put(`/users/${userId}`, editedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

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
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.username}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-white" />
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 cursor-pointer">
                  <CameraIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>
          </div>
          <button
            onClick={handleEdit}
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
                    value={userProfile.username}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        username: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={userProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        phone: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    value={userProfile.university}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        university: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={userProfile.department}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        department: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                value={editedProfile.bio || userProfile.bio || ""}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bio: e.target.value })
                }
                disabled={!isEditing}
                rows={4}
                className="input-field"
              />
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Interests
              </h3>
              <div className="space-y-4">
                {userProfile.interests.map((interest, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${index}`}
                      checked={
                        editedProfile.interests?.includes(interest) || false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditedProfile({
                            ...editedProfile,
                            interests: [
                              ...(editedProfile.interests || []),
                              interest,
                            ],
                          });
                        } else {
                          setEditedProfile({
                            ...editedProfile,
                            interests:
                              editedProfile.interests?.filter(
                                (i) => i !== interest
                              ) || [],
                          });
                        }
                      }}
                      disabled={!isEditing}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`interest-${index}`}
                      className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Event History */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Event History
              </h3>
              <div className="space-y-2">
                {userProfile.eventHistory.map((eventId, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    Event ID: {eventId}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Reviews
              </h3>
              <div className="space-y-4">
                {userProfile.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{review.rating}/5</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
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
                <button onClick={handleSave} className="btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
