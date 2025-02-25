import Thumbnail from '@/components/root/Thumbnail';
import { Models } from 'node-appwrite';
import FormattedDateTime from '@/components/root/type/FormattedDateTime';

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="mb-1">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} />
    </div>
  </div>
);

export default ImageThumbnail;
