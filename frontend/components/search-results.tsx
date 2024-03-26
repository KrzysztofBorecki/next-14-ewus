import type { TSearchResults } from '@/types/types';

export default function SearchResults({
  searchResults,
}: {
  searchResults: TSearchResults | null;
}) {
  return (
    searchResults ? (
      <pre>
        {JSON.stringify(searchResults, null, 2)}
      </pre>
    ) : 'Brak wyników'
  );
}
