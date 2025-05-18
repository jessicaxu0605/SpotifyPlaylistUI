import { useContext, useState, useEffect } from "react";
import PlaylistContext from "../PlaylistContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const TableView = () => {
  const { playlist } = useContext(PlaylistContext);
  const [sortedTracks, setSortedTracks] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const columns = [
    { id: "name", label: "Name" },
    { id: "artist", label: "Artist" },
    { id: "album", label: "Album" },
    { id: "duration", label: "Duration" },
  ];

  useEffect(() => {
    if (playlist) {
      const sorted = [...playlist.tracks].sort((a, b) => {
        let comparison = 0;

        switch (orderBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "artist":
            comparison = a.artists[0].name.localeCompare(b.artists[0].name);
            break;
          case "album":
            comparison = a.album.name.localeCompare(b.album.name);
            break;
          case "duration":
            comparison = a.duration_ms - b.duration_ms;
            break;
          default:
            comparison = 0;
        }

        return order === "asc" ? comparison : -comparison;
      });

      setSortedTracks(sorted);
    }
  }, [order, orderBy, playlist]);

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const humanizeDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  return (
    <TableContainer sx={{ height: "100%", overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "background.paper",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell>{truncate(track.name, 20)}</TableCell>
              <TableCell>
                {truncate(
                  track.artists.map((artist) => artist.name).join(", "),
                  50
                )}
              </TableCell>
              <TableCell>{truncate(track.album.name, 50)}</TableCell>
              <TableCell>{humanizeDuration(track.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
