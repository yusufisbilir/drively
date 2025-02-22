'use client';

import { Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import getFileType from '@/utils/getFileType';
import Thumbnail from './Thumbnail';
import { convertFileToUrl } from '@/utils/convertFileToUrl';
import LoadingSpinner from '../ui/loadingSpinner';

const FileUploader = ({ ownerId, userId, className }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700 px-4">
        <Upload className="h-5 w-5" />
        Upload
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-lg bg-white p-4">
          <h4>Uploading</h4>
          {files.map((file, idx) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between gap-3 rounded-lg p-3 shadow-drop-3"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
                  <div className="max-w-[300px]">
                    {file.name}
                    <LoadingSpinner className="size-4" />
                  </div>
                </div>
                <Button variant="ghost" onClick={(e) => handleRemoveFile(e, file.name)}>
                  <X className="size-6 cursor-pointer hover:opacity-75" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
