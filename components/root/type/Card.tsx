import Link from 'next/link';
import { Models } from 'node-appwrite';
import Thumbnail from '../Thumbnail';

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3"
    >
      <Thumbnail
        type={file.type}
        extension={file.extension}
        url={file.url}
        className="!size-20"
        imageClassName="!size-11"
      />
    </Link>
  );
};

export default Card;
