import AnalogFarewell from "./components/analog-farewell";
import Home from "./components/home";
import VisualTrackPlayer from "./components/visual-track-player";

function App() {
  return (
    <div className="bg-dark">
      <Home />
      <VisualTrackPlayer />
      <AnalogFarewell />
    </div>
  );
}

export default App;
