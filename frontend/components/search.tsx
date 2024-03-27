'use client';

import { useState } from 'react';
import { SectionContent } from '@/components/section';
import SearchForm from '@/components/forms/search-form';
import SearchResults from '@/components/search-results';
import SearchImg from '@/components/search-img';
import type { TSearchResults } from '@/types/types';

export default function Search() {
  const [searchResults, setSearchResults] = useState<TSearchResults | null>(null);

  return (
    <>
      <SectionContent>
        <SearchForm setSearchResults={setSearchResults} />
        <SearchImg className="hidden sm:block size-0 sm:size-80" />
      </SectionContent>
      <SectionContent>
        <SearchResults searchResults={searchResults} />
      </SectionContent>
    </>
  );
}
