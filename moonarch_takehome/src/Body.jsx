import "./App.css";
import { useContext, useState, useEffect } from "react";
import PlaylistContext from "./PlaylistContext";
import TableView from "./components/TableView";
import SearchBar from "./components/SearchBar";
import PieChartView from "./components/PieChartView";

const Body = () => {
  const { playlist, selectPlaylist } = useContext(PlaylistContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playlist) {
      setLoading(false);
    }
  }, [playlist]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <SearchBar />
          <PieChartView />
          <TableView />
        </div>
      )}
    </div>
  );
};

export default Body;
