import { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Plot?: string;
  imdbRating?: string;
  Genre?: string;
  Runtime?: string;
}

type OmdbResponse = {
  Search?: Movie[];
};

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout); // cleanup cancels the pending update
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const debouncedQuery = useDebouncedValue(search, 500);
  const [results, setResults] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);

  console.log(errorMessage);

  const handleSearch = async () => {
    try {
      const searchRes = await fetch(
        `https://www.omdbapi.com/?apikey=8b67098a&s=${debouncedQuery}`,
      );
      const data: OmdbResponse = await searchRes.json();
      // console.log('data', data);

      // Step 2: For each movie, fetch full details using imdbID
      const detailPromises = (data.Search ?? []).map((movie) =>
        fetch(
          `https://www.omdbapi.com/?apikey=8b67098a&i=${movie.imdbID}&plot=short`,
        ).then((res) => res.json()),
      );
      const detailedResults = await Promise.all(detailPromises);
      setResults(detailedResults);
      // console.log('detailedResults', detailedResults);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <input
          type="text"
          required
          value={search}
          placeholder="Search movies.."
          style={styles.input}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>

      {!isLoading && (
        <div style={styles.moviesContainer}>
          <MovieGrid movies={results} />
        </div>
      )}
    </div>
  );
}

const styles = {
  input: {
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontWeight: '600',
  },
  button: {
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontWeight: '600',
  },
  moviesContainer: {
    display: 'grid',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 2fr))',
    gap: '20px',
  },
};
