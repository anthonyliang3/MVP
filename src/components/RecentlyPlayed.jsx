import Grid from "@suid/material/Grid";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import ToggleButton from "@suid/material/ToggleButton";
import ToggleButtonGroup from "@suid/material/ToggleButtonGroup";
import RecentModal from './RecentModal.jsx';
import { createSignal } from "solid-js";
import PlaylistModal from './PlaylistModal.jsx';

const RecentlyPlayed = (props) => {
  return (
    <Box sx={{backgroundColor: 'black'}}>
      <ToggleButtonGroup
      color="success"
      value={props.limit()}
      exclusive
      fullWidth
      onChange={props.changeHandler}
      >
        <ToggleButton sx={{color:"#808080"}}value="10">Past 10 Songs</ToggleButton>
        <ToggleButton sx={{color:"#808080"}} value="25">Past 25 Songs</ToggleButton>
        <ToggleButton sx={{color:"#808080"}} value="50">Past 50 Songs</ToggleButton>
      </ToggleButtonGroup>
      <PlaylistModal name={props.name} onPlaylistClick={props.onPlaylistClick} playlistName={props.onPlaylistNameChange}/>
      <For each={props.recents()}>
      {(track, i) => (
        <Grid container spacing={0} alignItems="center" justifyContent="center" padding="7px">
          <Grid item xs={0.5} color="#808080">
            <Typography>
              {i() + 1}
            </Typography>
          </Grid>
          <Grid item xs={0.8}>
            <img src={track.track.album.images[2].url} height="80px" width="80px" style="border-radius:10%"/>
          </Grid>
          <Grid item xs={10}>
              <RecentModal name={track.track.name} url={track.track.external_urls.spotify} image={track.track.album.images[2].url}/>
            <For each={track.track.artists}>
              {(artist, i) => {
                if (track.track.artists.length === 1) {
                  return (
                    <span style={{color:'grey'}}>
                        &nbsp&nbsp&nbsp&nbsp{artist.name}
                      </span>
                  )
                } else if (i() === 0) {
                  return (
                    <span style={{color:'grey'}}>
                      &nbsp&nbsp&nbsp&nbsp{artist.name}, &nbsp
                    </span>
                  )
                } else if (track.track.artists.length - 1 === i()) {
                  return (
                    <span style={{color:"grey"}}>
                      {artist.name}
                    </span>
                  )
                } else {
                  return (
                    <span style={{color:"grey"}}>
                      {artist.name}, &nbsp
                    </span>
                  )
                }
              }}
            </For>
          </Grid>
        </Grid>
      )}
    </For>
    </Box>
  )
}

export default RecentlyPlayed;