import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from '../Thumbnail';
import convertFileSize from '@/utils/convertFileSize';
import FormattedDateTime from './FormattedDateTime';
import ActionDropdown from './fileActionDropdown';

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-sm text-neutral-500">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-md font-semibold text-neutral-700 line-clamp-1">{file.name}</p>
        <div className="flex flex-col gap-1">
          <FormattedDateTime date={file.$createdAt} className="text-neutral-500 text-sm" />
          <p className="text-xs text-neutral-500">{file.owner.fullName}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
