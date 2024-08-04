'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import TagInput from '@/components/input/taginput';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { save2notion } from '@/services/save2';

const Save2Notion: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [parseURL, setParseURL] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const sourcePlatform = 'web';
  const save2Platform = 'notion';
  const handleTagsChange = (updatedTags: string[]) => {
    setTags(updatedTags);
  };

  const handleSave = async () => {
    setSending(true);
    try {
      const result = await save2notion({
        tags,
        content,
        parse_url: parseURL,
        source_platform: sourcePlatform,
        save2_platform: save2Platform
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const handleToggleParseURL = () => {
    setParseURL(!parseURL);
  };

  return (
    <>
      <div className="col-span-2">
        <div>
          <h1>Save2Notion</h1>
        </div>
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 py-2">
              <Switch
                id="airplane-mode"
                onCheckedChange={handleToggleParseURL}
                checked={parseURL}
              />
              <Label htmlFor="airplane-mode">Parse URL</Label>
            </div>
            <Textarea
              placeholder="Type your message here."
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <div className="flex items-center justify-between">
              <div className="flex ">
                <TagInput onTagsChange={handleTagsChange} />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={sending}>
                  Save2Notion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Save2Notion;
