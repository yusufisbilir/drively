import { Models } from 'node-appwrite';
import ImageThumbnail from './ImageThumbnail';
import formatDateTime from '@/utils/formatDateTime';
import convertFileSize from '@/utils/convertFileSize';

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="label text-left">{label}</p>
    <p className="text-left">{value}</p>
  </div>
);

const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

export default FileDetails;
