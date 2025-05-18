// credentials here
const config = {
  ROOT_URL: "https://api.spotify.com/v1",
  auth: {
    SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  },
};

export default config;
