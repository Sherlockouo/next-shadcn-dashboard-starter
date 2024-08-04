'use client';

// src/App.tsx
import React, { useState } from 'react';
import ChatSidebar from '@/components/chat/chat-side-bar';
import Chat from '@/components/chat/chat-msg';
import ChatInput from '@/components/input/chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';

const Chat2Kimi: React.FC = () => {
  const [history, setHistory] = useState([
    {
      id: '1',
      title: '',
      group_id: '1',
      content:
        '当然可以！这里有一个关于程序员的笑话：\n\n为什么程序员不喜欢户外活动？\n\n因为它们更喜欢`int`（整数）而不是`float`（浮点数）',
      model: '',
      role: 'assistant',
      created_at: '2024-07-31 15:37:27',
      updated_at: '2024-07-31 15:37:27'
    },
    {
      id: '2',
      title: '',
      group_id: '1',
      content: '讲个笑话',
      model: '',
      role: 'user',
      created_at: '2024-07-31 15:37:13',
      updated_at: '2024-07-31 15:37:13'
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    {
      id: '1',
      content:
        '当然可以！这里有一个关于程序员的笑话：\n\n为什么程序员不喜欢户外活动？\n\n因为它们更喜欢`int`（整数）而不是`float`（浮点数）',
      role: 'assistant',
      created_at: '2024-07-31 15:37:27'
    },
    {
      id: '2',
      content: '讲个笑话',
      role: 'user',
      created_at: '2024-07-31 15:37:13'
    }
  ]);

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
    // 在实际应用中，这里应该根据 id 加载对应的消息历史
  };

  const handleSendMessage = (content: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        content,
        role: 'user',
        created_at: new Date().toISOString()
      }
    ]);
  };

  const handleUploadFile = (file: File) => {
    // 处理文件上传逻辑
    console.log(file);
  };

  return (
    <div className="flex">
      <ChatSidebar history={history} onSelect={handleSelectChat} />
      <div className="flex flex-col">
        <Chat messages={messages} />
        <ChatInput onSend={handleSendMessage} onUpload={handleUploadFile} />
      </div>
    </div>
  );
};

export default Chat2Kimi;
