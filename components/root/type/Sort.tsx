'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortTypes } from '@/constants';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Sort = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };
  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger>
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent>
        {sortTypes.map((sort) => (
          <SelectItem key={sort.label} className="cursor-pointer" value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
