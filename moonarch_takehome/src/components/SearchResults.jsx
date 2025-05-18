import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import PlaylistContext from "../PlaylistContext";

const SearchResults = ({ searchResults, closeResults }) => {
  const { selectPlaylist } = useContext(PlaylistContext);
  const handleClick = (id) => {
    selectPlaylist(id);
    closeResults();
  };
  return (
    <Box sx={{ width: "100%", maxHeight: "50vh", overflow: "scroll" }}>
      <List>
        {searchResults.map((result) => (
          <ListItem key={result.id}>
            <ListItemButton onClick={() => handleClick(result.id)}>
              <ListItemText primary={result.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchResults;
