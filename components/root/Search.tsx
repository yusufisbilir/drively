'use client';

import React, { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Models } from 'node-appwrite';
import { getFiles } from '@/lib/actions/file.actions';
import Thumbnail from './Thumbnail';
import FormattedDateTime from './type/FormattedDateTime';

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const router = useRouter();
  const path = usePathname();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?query=${query}`
    );
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ''));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);

  return (
    <div className="relative w-full md:max-w-[480px]">
      <div className="flex flex-1 items-center gap-3 px-2">
        <SearchIcon
          className={`h-5 w-5 transition-colors ${isFocused ? 'text-blue-600' : 'text-neutral-400'}`}
        />
        <Input
          value={query}
          placeholder="Search files, documents..."
          className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-full border-none p-0 shadow-none placeholder:text-neutral-400 text-neutral-700"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {open && (
        <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                className="flex items-center justify-between"
                key={file.$id}
                onClick={() => handleClickItem(file)}
              >
                <div className="flex cursor-pointer items-center gap-4">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="size-9 min-w-9"
                  />
                  <p>{file.name}</p>
                </div>

                <FormattedDateTime date={file.$createdAt} />
              </li>
            ))
          ) : (
            <p>No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
