import React, { useState } from "react";
import { useSocial } from "../../contexts/SocialContext";
import { EventAnnouncement } from "../../types/social";

interface EventAnnouncementsProps {
  eventId: string;
  isOrganizer: boolean;
}

export const EventAnnouncements: React.FC<EventAnnouncementsProps> = ({
  eventId,
  isOrganizer,
}) => {
  const { announcements, loading, error, addAnnouncement } = useSocial();
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "low" as const,
  });

  const eventAnnouncements = announcements.filter(
    (announcement) => announcement.eventId === eventId
  );

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim())
      return;

    try {
      await addAnnouncement({
        eventId,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        priority: newAnnouncement.priority,
      });
      setNewAnnouncement({ title: "", content: "", priority: "low" });
    } catch (err) {
      console.error("Failed to add announcement:", err);
    }
  };

  if (loading) {
    return <div>Loading announcements...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Event Announcements</h2>

      {isOrganizer && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Create Announcement</h3>
          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newAnnouncement.priority}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Post Announcement
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {eventAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-6 rounded-lg border-2 ${
              announcement.priority === "high"
                ? "border-red-500 bg-red-50"
                : announcement.priority === "medium"
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <span className="text-sm text-gray-500">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
