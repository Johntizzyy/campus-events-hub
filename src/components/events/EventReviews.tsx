import React, { useState } from "react";
import { useSocial } from "../../contexts/SocialContext";
import { Review, EventDiscussion } from "../../types/social";

interface EventReviewsProps {
  eventId: string;
}

export const EventReviews: React.FC<EventReviewsProps> = ({ eventId }) => {
  const { reviews, discussions, loading, error, addReview, addDiscussion } =
    useSocial();
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [newDiscussion, setNewDiscussion] = useState("");
  const [activeTab, setActiveTab] = useState<"reviews" | "discussions">(
    "reviews"
  );

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({
        userId: "current-user-id", // TODO: Get from auth context
        eventId,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setNewReview({ rating: 5, comment: "" });
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDiscussion({
        userId: "current-user-id", // TODO: Get from auth context
        eventId,
        content: newDiscussion,
        replies: [],
      });
      setNewDiscussion("");
    } catch (err) {
      console.error("Failed to submit discussion:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const eventReviews = reviews.filter((review) => review.eventId === eventId);
  const eventDiscussions = discussions.filter(
    (discussion) => discussion.eventId === eventId
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "reviews"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "discussions"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </button>
      </div>

      {activeTab === "reviews" ? (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {eventReviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-md">
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
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Start a Discussion</h3>
            <form onSubmit={handleDiscussionSubmit} className="space-y-4">
              <div>
                <textarea
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post Discussion
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {eventDiscussions.map((discussion) => (
              <div key={discussion.id} className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{discussion.content}</p>
                {discussion.replies.length > 0 && (
                  <div className="mt-4 ml-8 space-y-2">
                    {discussion.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3 bg-gray-100 rounded-md"
                      >
                        <p className="text-gray-700">{reply.content}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
