// import './App.css'
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <p>Movie-Search-App</p>
      <SearchBar />
    </div>
  );
}

export default App;
