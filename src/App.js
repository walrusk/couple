import Game from './Game';
import GameMode from './GameMode';

function App() {
  return (
    <div className="App">
      <header className="text-center p-4 bg-base-300">
        <div className="flex items-center justify-center space-x-6">
          <div className="prose">
            <h1 className="m-0">Couple</h1>
          </div>
          <GameMode />
        </div>
      </header>
      <div className="prose mx-auto">
        <Game />
      </div>
    </div>
  );
}

export default App;
