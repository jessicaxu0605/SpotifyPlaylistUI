import "./App.css";
import { useContext, useState, useEffect } from "react";
import PlaylistContext from "./PlaylistContext";
import TableView from "./components/TableView";
import SearchBar from "./components/SearchBar";
import PieChartView from "./components/PieChartView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Box>
            <SearchBar />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box sx={{ textAlign: "left", padding: "10px" }}>
              <Typography variant="body1">Currently Viewing</Typography>
              <Typography variant="h4" fontWeight={600} paddingTop={1}>
                {playlist.name}
              </Typography>
            </Box>
            <Box
              sx={{
                height: "calc(100vh - 250px)",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  flex: 4,
                  width: { xs: "100%", md: "auto" },
                  height: { xs: "50%", md: "100%" },
                }}
              >
                <PieChartView />
              </Box>
              <Box
                sx={{
                  flex: 5,
                  overflow: "auto",
                  width: { xs: "100%", md: "auto" },
                  height: { xs: "50%", md: "100%" },
                }}
              >
                <TableView />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Body;
