import config from "./config";
import useSpotifyAuth from "./useSpotifyAuth";

const useSpotifyApi = () => {
  const { getToken } = useSpotifyAuth();

  const getPlaylist = async (playlistId) => {
    try {
      const token = await getToken();
      const response = await fetch(
        config.ROOT_URL + "/playlists/" + playlistId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchPlaylists = async (query) => {
    const params = new URLSearchParams({
      q: query,
      type: ["playlist"],
    });

    try {
      const token = await getToken();
      const response = await fetch(config.ROOT_URL + "/search?" + params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.playlists.items.filter((item) => item);
    } catch (error) {
      console.error(error);
    }
  };

  const getArtistGenres = async (artists) => {
    console.log("artists", artists);
    const params = new URLSearchParams({
      ids: artists.map((artist) => artist.id).join(","),
    });
    console.log(params);
    try {
      const token = await getToken();
      const response = await fetch(config.ROOT_URL + "/artists?" + params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const artistToGenres = data.artists.reduce((acc, artist) => {
        acc[artist.id] = artist.genres;
        return acc;
      }, {});
      return artistToGenres;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getPlaylist,
    searchPlaylists,
    getArtistGenres,
  };
};

export default useSpotifyApi;
