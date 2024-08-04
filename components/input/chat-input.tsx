'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (content: string) => void;
  onUpload: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onUpload }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      onUpload(e.target.files[0]);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex  items-center border-t p-4">
      <Input
        disabled={isUploading}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileUpload"
      />
      <label htmlFor="fileUpload" className="mr-4 cursor-pointer">
        <svg
          className="h-6 w-6 text-gray-500 hover:text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z"
          />
        </svg>
      </label>
      <Textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 resize-none rounded-md border p-2"
        rows={1}
        placeholder="输入消息..."
        style={{ maxHeight: '50vh' }}
      />
      <Button
        onClick={handleSend}
        className="ml-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        发送
      </Button>
    </div>
  );
};

export default ChatInput;
