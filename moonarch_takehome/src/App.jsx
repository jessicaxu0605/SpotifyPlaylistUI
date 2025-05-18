import "./App.css";
import { PlaylistProvider } from "./PlaylistContext";
import Body from "./Body";

function App() {
  return (
    <PlaylistProvider>
      <Body />
    </PlaylistProvider>
  );
}

export default App;
