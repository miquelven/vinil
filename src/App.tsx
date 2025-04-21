import Home from "./components/home";
import VinylTimeLine from "./components/vinyl-timeline";
import VisualTrackPlayer from "./components/visual-track-player";

function App() {
  return (
    <div className="bg-dark">
      <Home />
      <VisualTrackPlayer />
      <VinylTimeLine />
    </div>
  );
}

export default App;
