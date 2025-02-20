'use client';

import { Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({
  ownerId,
  userId,
  className,
}: {
  ownerId: string;
  userId: string;
  className?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="cursor-pointer" {...getRootProps()}>
      <div>
        <input {...getInputProps()} />
        <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700 px-4">
          <Upload className="h-5 w-5" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
