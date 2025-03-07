import { cn } from '@/lib/utils';
import { getFileIcon } from '@/utils/getFileIcon';
import Image from 'next/image';

const Thumbnail = ({ type, extension, url = '', className, imageClassName }: ThumbnailProps) => {
  const isImage = type === 'image' && extension !== 'svg';

  return (
    <figure
      className={cn(
        className,
        'flex items-center justify-center size-[50px] min-w-[50px] overflow-hidden rounded-full'
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt={`${type} thumbnail`}
        width={100}
        height={100}
        className={cn(
          'size-8 object-contain',
          imageClassName,
          isImage && 'size-full object-cover object-center'
        )}
      />
    </figure>
  );
};

export default Thumbnail;
