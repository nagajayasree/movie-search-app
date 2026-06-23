// import './App.css'
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        Movie-Search-App
      </h3>
      <SearchBar />
    </div>
  );
}

export default App;
