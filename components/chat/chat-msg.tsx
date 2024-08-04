'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatProps {
  messages: {
    id: string;
    content: string;
    role: string;
    created_at: string;
  }[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ScrollArea className="flex-1  overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.role === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <div
            className={`inline-block rounded p-2 ${
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {message.content}
          </div>
          <div className="text-xs text-gray-500">{message.created_at}</div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default Chat;
