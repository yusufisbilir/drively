'use client';

import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    </div>
  );
};

export default Search;
