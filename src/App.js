import Game from './Game';

function App() {
  return (
    <div className="App prose mx-auto">
      <header className="text-center p-6 mt-6">
        <h1 className="m-0">Couple</h1>
        <small className="opacity-50">Reveal all pairs to win!</small>
      </header>
      <div>
        <Game />
      </div>
    </div>
  );
}

export default App;
