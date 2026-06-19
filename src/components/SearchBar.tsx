import { useEffect, useState } from 'react';
import MovieGrid from './MovieCard';

export interface Movie {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Poster?: string;
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

  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?apikey=8b67098a&s=${debouncedQuery.trim()}`)
  //     .then((res) => res.json())
  //     .then((data: OmdbResponse) => {
  //       // console.log(debouncedQuery);
  //       // console.log('Data', data);
  //       setMovies(data.Search ?? []);
  //     })
  //     .catch((err) => {
  //       setErrorMessage(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [debouncedQuery]);

  // console.log('Movies:', results);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=8b67098a&s=${debouncedQuery}}`,
      );
      const data: OmdbResponse = await res.json();
      setResults(data.Search ?? []);
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
      <div style={styles.moviesContainer}>
        <MovieGrid movies={results} />
      </div>
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
};
