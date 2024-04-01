import type { TSearchResults } from '@/types/types';

export default function SearchResults({
  searchResults,
}: {
  searchResults: TSearchResults | null;
}) {
  return (
    searchResults ? (
      <pre>
        <p>Dane Pacjenta</p>
        <p>Pesel: {searchResults.body.patientPesel}</p>
        <p>Imię: {searchResults.body.patientFirstName}</p>
        <p>Nazwisko: {searchResults.body.patientLastName}</p>
        <p>Status ubezpieczenia: {searchResults.body.insuranceStatus}</p>
      </pre>
    ) : 'Brak wyników'
  );
}
