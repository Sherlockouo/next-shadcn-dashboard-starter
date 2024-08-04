'use client';

import React from 'react';

interface ChatSidebarProps {
  history: {
    id: string;
    title: string;
    group_id: string;
    content: string;
    model: string;
    role: string;
    created_at: string;
    updated_at: string;
  }[];
  onSelect: (id: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ history, onSelect }) => {
  return (
    <div className="h-full min-h-[calc(100vh-200px)] w-1/4 overflow-y-auto rounded-md border-r bg-gray-50 p-4">
      <h2 className="mb-4 text-xl font-bold">Chat History</h2>
      <ul>
        {history.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => onSelect(chat.id)}
              className="block w-full p-2 text-left hover:bg-gray-200"
            >
              {chat.title ? chat.id : chat.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
