import { useEffect, useState } from 'react';
import MovieGrid from './MovieGrid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    return () => clearTimeout(timeout);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=8b67098a&s=mario`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data.Search ?? []);
      } catch (e) {
        if (e !== 'AbortError') {
          setErrorMessage(e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const fetchMovies = async () => {
        const searchRes = await fetch(
          `https://www.omdbapi.com/?apikey=8b67098a&s=${debouncedQuery}`,
        );
        const data: OmdbResponse = await searchRes.json();

        const detailPromises = (data.Search ?? []).map((movie) =>
          fetch(
            `https://www.omdbapi.com/?apikey=8b67098a&i=${movie.imdbID}&plot=short`,
          ).then((res) => res.json()),
        );

        const detailedResults = await Promise.all(detailPromises);
        setResults(detailedResults);
      };

      await Promise.all([fetchMovies(), delay(2500)]);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : String(err));
      setResults([]);
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

      {isLoading ? (
        <div style={styles.moviesContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton height={350} width={250} />
              <Skeleton width={180} />
              <Skeleton width={120} />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <h4 style={{ color: 'red' }}>{errorMessage}</h4>
      ) : results.length > 0 ? (
        <div style={styles.moviesContainer}>
          <MovieGrid movies={results} />
        </div>
      ) : (
        <h4 style={{ display: 'flex', alignSelf: 'center' }}>
          No results found!
        </h4>
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
