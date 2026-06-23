import React from 'react';
import type { Movie } from './SearchBar';

interface MovieDetailsModalProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  movie: Movie;
  selectedCard: string | null;
}

export default function MovieDetailsModal({
  selectedCard,
  onClose,
  movie,
}: MovieDetailsModalProps) {
  const placeholderSrc = new URL(
    '../assets/No-Image-Placeholder.svg',
    import.meta.url,
  ).href;

  return (
    <div style={styles.container}>
      <div style={styles.dialogContainer}>
        {selectedCard === movie.imdbID && (
          <dialog
            open
            onClick={(e) => e.stopPropagation()}
            style={styles.dialog}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <button style={{ width: '10%' }} onClick={onClose}>
                Close
              </button>
              <button style={{ width: '10%' }}>Add to Fav</button>
            </div>

            <div style={styles.info}>
              <div>
                <img
                  style={styles.image}
                  src={movie.Poster || placeholderSrc}
                  alt={movie.Title}
                  onError={(event) => {
                    event.currentTarget.src = placeholderSrc;
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <h3
                    style={{
                      overflowWrap: 'break-word',
                    }}
                  >
                    {movie.Title}
                  </h3>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <label>{movie.Year}</label>
                    {''}
                    <label>{movie.Genre}</label>
                    {''}
                    <label>{movie.Runtime}</label>
                    {''}
                    <label>{movie.imdbRating}</label>
                    {''}
                  </div>
                  <div>
                    <label>{movie.Plot}</label>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    display: 'flex',
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    borderRadius: '8px',
    borderColor: 'white',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '75%',
    height: '75%',
    borderRadius: '8px',
    borderColor: 'white',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  info: {
    borderRadius: '12px',
    padding: '12px',
    overflow: 'hidden',
  },
  image: {
    borderRadius: '8px',
    marginBottom: '5px',
    maxWidth: '35%',
    height: 'auto',
  },
};
