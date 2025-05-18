import config from "./config";
import { useState } from "react";

// make this a reusable hook
const useSpotifyAuth = () => {
  const [token, setToken] = useState(null);

  const refreshToken = async () => {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.auth.SPOTIFY_CLIENT_ID,
        client_secret: config.auth.SPOTIFY_CLIENT_SECRET,
      }),
    };
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      options
    );
    const data = await response.json();
    setToken(data.access_token);
    return data.access_token;
  };

  const getToken = async () => {
    if (!token) {
      return await refreshToken();
    }
    return token;
  };

  return { getToken };
};

export default useSpotifyAuth;
