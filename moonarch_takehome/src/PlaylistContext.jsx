import { createContext, useState, useEffect } from "react";
import useSpotifyApi from "./api/useSpotifyApi";

const DEFAULT_PLAYLIST_ID = "3cEYpjA9oz9GiPac4AsH4n";

const PlaylistContext = createContext({
  playlist: null,
  selectPlaylist: null,
});

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(null);
  const { getPlaylist, getArtistGenres } = useSpotifyApi();

  useEffect(() => {
    selectPlaylist(DEFAULT_PLAYLIST_ID);
  }, []);

  const getUniqueArtists = (data) => {
    console.log("data.tracks.items", data.tracks.items);
    return [
      ...new Set(data.tracks.items.flatMap((item) => item.track.artists)),
    ].slice(0, 50); // Take first 50 elements only
  };

  const getGenres = async (data) => {
    const uniqueArtists = getUniqueArtists(data);
    const genres = await getArtistGenres(uniqueArtists);
    return genres;
  };

  const selectPlaylist = async (playlistId) => {
    const data = await getPlaylist(playlistId);
    const genres = await getGenres(data);

    var processedData = {
      name: data.name,
      description: data.description,
      tracks: data.tracks.items.map((item) => {
        const track = item.track;
        console.log("track", track);
        const trackGenres = Object.entries(genres)
          .filter(([artistId, artistGenres]) =>
            track.artists.some((artist) => artist.id === artistId)
          )
          .flatMap(([artistId, artistGenres]) => artistGenres);
        return {
          ...track,
          genres: trackGenres,
        };
      }),
    };
    console.log("playlist", processedData);

    setPlaylist(processedData);
  };

  return (
    <PlaylistContext.Provider value={{ playlist, selectPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;

/*
playlist: {
    name: string,
    description: string,
    tracks: {
        items: []
    }
}
    store this in a context smwhere
*/
