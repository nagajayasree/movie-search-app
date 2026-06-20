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
  return (
    <div style={styles.container}>
      <div style={styles.dialogContainer}>
        {selectedCard === movie.imdbID && (
          <dialog
            open
            onClick={(e) => e.stopPropagation()}
            style={styles.dialog}
          >
            <button onClick={onClose}>Close</button>
            <div
              style={{
                borderRadius: '12px',
                padding: '12px',
                overflow: 'hidden',
              }}
            >
              <div style={styles.image}>
                <img src={movie.Poster} />
              </div>
              <div>
                <label>{movie.Title}</label>
                <label>{movie.Year}</label>
                <label>{movie.Genre}</label>
                <label>{movie.Runtime}</label>
                <label>{movie.imdbID}</label>
                <label>{movie.Plot}</label>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
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
    width: '50%',
    height: '50%',
    borderRadius: '8px',
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
};
