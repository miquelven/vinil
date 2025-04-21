import Footer from "./components/footer";
import AnalogFarewell from "./components/analog-farewell";
import Home from "./components/home";
import VinylVerse from "./components/vinyl-verse";
import VinylStories from "./components/vinyl-stories";
import VinylTimeLine from "./components/vinyl-timeline";
import VisualTrackPlayer from "./components/visual-track-player";
import Header from "./components/header";

function App() {
  return (
    <div className="bg-dark">
      <Header />
      <Home />
      <VisualTrackPlayer />
      <VinylVerse />
      <VinylStories />
      <VinylTimeLine />
      <AnalogFarewell />
      <Footer />
    </div>
  );
}

export default App;
