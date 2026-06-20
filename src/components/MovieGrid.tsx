import { useState } from 'react';
import type { Movie } from './SearchBar';
import MovieDetailsModal from './MovieDetailsModal';

export interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const placeholderSrc = new URL(
    '../assets/No-Image-Placeholder.svg',
    import.meta.url,
  ).href;

  const onHandleClick = (movieId: string | null | undefined) => {
    setSelectedCard(movieId ?? null);
    setIsModalOpen(!isModalOpen);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
    setSelectedCard(null);
  };

  return (
    <>
      {movies.map((movie) => (
        <div
          style={styles.cardStyle}
          key={movie.imdbID}
          onClick={() => onHandleClick(movie.imdbID)}
        >
          <img
            style={styles.image}
            src={movie.Poster || placeholderSrc}
            alt={movie.Title}
            onError={(event) => {
              event.currentTarget.src = placeholderSrc;
            }}
          />
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
          {selectedCard === movie.imdbID && (
            <MovieDetailsModal
              movie={movie}
              onClose={onClose}
              selectedCard={selectedCard}
            />
          )}
        </div>
      ))}
    </>
  );
}

const styles = {
  cardStyle: {
    width: '250px',
    height: '400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '12px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },

  image: {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
};
