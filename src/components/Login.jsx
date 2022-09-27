const client_id = import.meta.env.VITE_CLIENT_ID;
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

const Login = () => {
  return (
    <div>Connect to Spotify</div>
  )
}

export default Login;