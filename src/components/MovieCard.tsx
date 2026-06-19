import type { Movie } from './SearchBar';

interface MovieCardProps {
  movies: Movie[];
}

export default function MovieCard({ movies }: MovieCardProps) {
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div style={styles.cardStyle} key={movie.imdbID}>
            <img style={styles.image} src={movie.Poster} alt={movie.imdbID} />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
          </div>
        );
      })}
    </div>
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
    // alignText:'center',
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
