import { createEffect, onMount } from "solid-js";

const client_id = import.meta.env.VITE_CLIENT_ID;
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const space_delimiter = "%20";
const scopes = ["user-top-read", "user-read-playback-position", "user-read-recently-played", "playlist-modify-public"];
const scopes_url_param = scopes.join(space_delimiter);

const getParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
}

const Login = () => {

  const handleLogin = () => {
    window.location = `${spotify_authorize_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes_url_param}&response_type=token&show_dialog=true`;
  }

  onMount(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParams(window.location.hash);
      localStorage.clear();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", token_type);
      localStorage.setItem("token_type", token_type);
    }
  })

  return (
    <div>
      <h1>Connect to Spotify</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;