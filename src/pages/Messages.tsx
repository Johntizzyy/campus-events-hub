import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSocial } from "../contexts/SocialContext";
import { DirectMessages } from "../components/messaging/DirectMessages";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function Messages() {
  const { user } = useAuth();
  const { conversations, getConversations, sendMessage } = useSocial();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getConversations(user.id);
    }
  }, [user, getConversations]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle selecting a conversation
  const handleSelectConversation = (
    conversationId: string,
    participantName: string
  ) => {
    setSelectedConversation(conversationId);
    setRecipientId(conversationId);
    setRecipientName(participantName);
  };

  // Handle starting a new conversation
  const handleStartNewConversation = () => {
    if (recipientId && recipientName) {
      setSelectedConversation(recipientId);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!user || !recipientId || !newMessage.trim()) return;

    try {
      await sendMessage(user.id, recipientId, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Conversations Sidebar */}
            <div className="border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Messages
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              {/* New Conversation Form */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Conversation
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Recipient ID"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                    value={recipientId || ""}
                    onChange={(e) => setRecipientId(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Recipient Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <button
                    onClick={handleStartNewConversation}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Start Conversation
                  </button>
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredConversations.map((conv) => (
                      <li key={conv.id}>
                        <button
                          onClick={() =>
                            handleSelectConversation(
                              conv.id,
                              conv.participantName
                            )
                          }
                          className={`w-full text-left p-3 rounded-md ${
                            selectedConversation === conv.id
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                              <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {conv.participantName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {conv.participantName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                                {conv.lastMessage}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-2 text-gray-400 dark:text-gray-600" />
                    <p>No conversations found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col">
              {selectedConversation ? (
                <DirectMessages
                  recipientId={selectedConversation}
                  recipientName={recipientName}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a conversation from the list or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
