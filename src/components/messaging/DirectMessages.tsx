import React, { useState, useEffect, useRef } from "react";
import { useSocial } from "../../contexts/SocialContext";
import { DirectMessage } from "../../types/social";

interface DirectMessagesProps {
  recipientId: string;
  recipientName: string;
}

export const DirectMessages: React.FC<DirectMessagesProps> = ({
  recipientId,
  recipientName,
}) => {
  const { messages, loading, error, sendMessage, markMessageAsRead } =
    useSocial();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMessages = messages.filter(
    (msg) =>
      (msg.senderId === "current-user-id" && msg.receiverId === recipientId) ||
      (msg.senderId === recipientId && msg.receiverId === "current-user-id")
  );

  useEffect(() => {
    // Mark unread messages as read
    conversationMessages.forEach((msg) => {
      if (!msg.read && msg.receiverId === "current-user-id") {
        markMessageAsRead(msg.id);
      }
    });
  }, [conversationMessages, markMessageAsRead]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage({
        senderId: "current-user-id", // TODO: Get from auth context
        receiverId: recipientId,
        content: newMessage,
        read: false,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with {recipientName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === "current-user-id"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderId === "current-user-id"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.senderId === "current-user-id"
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
