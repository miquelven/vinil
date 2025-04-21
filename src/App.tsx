import Home from "./components/home";
import VinylVerse from "./components/vinyl-verse";
import VisualTrackPlayer from "./components/visual-track-player";

function App() {
  return (
    <div className="bg-dark">
      <Home />
      <VisualTrackPlayer />
      <VinylVerse />
    </div>
  );
}

export default App;
