'use client';

import { Upload } from 'lucide-react';
import { Button } from '../ui/button';

const FileUploader = () => {
  return (
    <div className="cursor-pointer">
      <Button type="button" className="bg-neutral-700 shadow-none hover:bg-neutral-600 px-2">
        <Upload className="w-6 h-6" />
        <p>Upload</p>
      </Button>
    </div>
  );
};

export default FileUploader;
