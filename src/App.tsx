import Home from "./components/home";
import VinylStories from "./components/vinyl-stories";
import VisualTrackPlayer from "./components/visual-track-player";

function App() {
  return (
    <div className="bg-dark">
      <Home />
      <VisualTrackPlayer />
      <VinylStories />
    </div>
  );
}

export default App;
