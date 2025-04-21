import Footer from "./components/footer";
import AnalogFarewell from "./components/analog-farewell";
import Home from "./components/home";
import VinylTimeLine from "./components/vinyl-timeline";
import VisualTrackPlayer from "./components/visual-track-player";

function App() {
  return (
    <div className="bg-dark">
      <Home />
      <VisualTrackPlayer />
      
      <VinylTimeLine />
      <AnalogFarewell />
      <Footer />
    </div>
  );
}

export default App;
