import React from 'react';
import { Models } from 'node-appwrite';
import { Input } from '@/components/ui/input';
import ImageThumbnail from './ImageThumbnail';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

const Share = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div>
        <p>Share file with other users</p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p>Shared with</p>
            <p>{file.users.length} users</p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li key={email} className="flex items-center justify-between gap-2">
                <p>{email}</p>
                <Button onClick={() => onRemove(email)}>
                  <Trash className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Share;
