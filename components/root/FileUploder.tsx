'use client';

import { Upload } from 'lucide-react';
import { Button } from '../ui/button';

const FileUploader = () => {
  return (
    <div className="cursor-pointer">
      <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700 px-4">
        <Upload className="h-5 w-5" />
        <span className="ml-2 font-medium">Upload</span>
      </Button>
    </div>
  );
};

export default FileUploader;
