import useSpotifyApi from "../api/useSpotifyApi";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef(null);
  const { searchPlaylists } = useSpotifyApi();

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchPlaylists(input);
    setSearchResults(data);
    setShowResults(true);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        width: "100%",
        border: "1px solid #e0e0e0",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
      onSubmit={handleSearch}
      ref={searchBarRef}
    >
      <InputBase
        sx={{
          width: "100%",
        }}
        placeholder="Search Google Maps"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Popover
        open={showResults}
        anchorEl={searchBarRef.current}
        onClose={() => setShowResults(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: searchBarRef.current?.offsetWidth,
          },
        }}
      >
        <SearchResults
          searchResults={searchResults}
          closeResults={() => setShowResults(false)}
        />
      </Popover>
    </Box>
  );
};

export default SearchBar;
