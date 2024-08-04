'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface TagInputProps {
  onTagsChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    onTagsChange(tags); // 当 tags 更新时，调用回调
  }, [tags, onTagsChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag('#' + inputValue);
      resetInput();
    }
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const resetInput = () => {
    setInputValue('');
    setIsEditing(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 p-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full bg-blue-500 px-2 py-1 text-white"
        >
          {tag}
          <button onClick={() => removeTag(tag)} className="ml-2 text-white">
            &times;
          </button>
        </span>
      ))}
      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加标签并按回车"
          className="flex-1 rounded-md border p-2"
          onBlur={resetInput} // 失去焦点时重置输入
          autoFocus
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-md bg-green-500 px-3 py-1 text-white"
        >
          +
        </button>
      )}
    </div>
  );
};

export default TagInput;
