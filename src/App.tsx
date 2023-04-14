import GameBackground from "./components/GameBackground";
import Stage from "./components/Stage";
import "./styles/App.css";

function App() {
  return (
    <GameBackground>
      <Stage />
    </GameBackground>
  );
}

export default App;
