import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import { useContext, useState, useEffect } from "react";
import PlaylistContext from "../PlaylistContext";
import useSpotifyApi from "../api/useSpotifyApi";

const PieChartView = () => {
  const { playlist } = useContext(PlaylistContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const genreToCount = playlist.tracks.reduce((acc, track) => {
      track.genres.forEach((genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {});

    const genresList = Object.entries(genreToCount).map(([genre, count]) => ({
      genre: genre,
      count: count,
    }));
    const genresSorted = genresList.sort((a, b) => b.count - a.count);
    const top5Genres = genresSorted.slice(0, 5);
    const otherCount = genresSorted
      .slice(5)
      .reduce((sum, item) => sum + item.count, 0);

    // Add "Other" category if there are more than 5 genres
    const finalGenres =
      otherCount > 0
        ? [...top5Genres, { genre: "Other", count: otherCount }]
        : top5Genres;
    console.log("finalGenres", finalGenres);
    setGenres(finalGenres);
  }, [playlist]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <PieChart
        series={[
          {
            data: genres.map((genre) => ({
              id: genre.genre,
              value: genre.count,
              label: genre.genre,
            })),
          },
        ]}
        width={200}
        height={200}
      />
    </Box>
  );
};

export default PieChartView;
