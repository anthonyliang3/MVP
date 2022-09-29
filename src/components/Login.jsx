import { createEffect, onMount } from "solid-js";
import Button from "@suid/material/Button";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import Paper from "@suid/material/Paper"

const client_id = import.meta.env.VITE_CLIENT_ID;
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const space_delimiter = "%20";
const scopes = ["user-top-read", "user-read-playback-position", "user-read-recently-played", "playlist-modify-public", "playlist-modify-private", "user-read-private", "streaming", "user-read-email", "user-read-playback-state", "user-modify-playback-state", "user-library-read", "user-library-modify"];
const scopes_url_param = scopes.join(space_delimiter);

const Login = () => {
  const handleLogin = () => {
    window.location = `${spotify_authorize_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes_url_param}&response_type=token&show_dialog=true`;
  }

  return (
    <Box sx={{textAlign:"center", padding:"50px", backgroundColor:"black"}}>
      <Paper elevation={1} sx={{height:'900px', backgroundColor:"black", backgroundImage: "url(https://i.postimg.cc/vBc3vhFD/0029286012-10.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contained"}}>
        <Typography variant="h2" sx={{color:"white"}}> Slotify </Typography>
        <br></br>
        <Typography variant='h4' sx={{color:"#F0F0F0"}}>Find your top songs</Typography>
        <br></br>
        <br></br>
        <Button color="success" variant="contained" onClick={handleLogin} size="large" sx={{height:'60px', width:'250px', fontSize:17, borderRadius: 5}}>Connect To Spotify</Button>
      </Paper>

    </Box>
  )
}

export default Login;