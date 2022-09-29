import Grid from "@suid/material/Grid";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import ToggleButton from "@suid/material/ToggleButton";
import ToggleButtonGroup from "@suid/material/ToggleButtonGroup";
import { createSignal } from "solid-js";
import TrackModal from './TrackModal.jsx';
import Fab from "@suid/material/Fab";
import AddIcon from "@suid/icons-material/Add";
import PlaylistAddIcon from '@suid/icons-material/PlaylistAdd';
import PlaylistModal from './PlaylistModal.jsx';

const TopTracks = (props) => {
  return (
    <Box sx={{backgroundColor: 'black'}}>
      <Grid container spacing={0}>
          <Grid item xs={6}>
            <ToggleButtonGroup
              color="success"
              value={props.duration()}
              exclusive
              fullWidth
              onChange={props.changeHandler}
            >
              <ToggleButton sx={{color:"#808080"}} value="long_term">All Time</ToggleButton>
              <ToggleButton sx={{color:"#808080"}} value="medium_term">Past 6 Months</ToggleButton>
              <ToggleButton sx={{color:"#808080"}} value="short_term">Past Month</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              color="success"
              value={props.limit()}
              exclusive
              fullWidth
              onChange={props.onLimitChange}
            >
              <ToggleButton sx={{color:"#808080"}} value="10">Top 10 Songs</ToggleButton>
              <ToggleButton sx={{color:"#808080"}} value="25">Top 25 Songs</ToggleButton>
              <ToggleButton sx={{color:"#808080"}} value="50">Top 50 Songs</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
    <PlaylistModal name={props.name} onPlaylistClick={props.onPlaylistClick} playlistName={props.onPlaylistNameChange}/>
    <For each={props.tracks()}>
      {(track, i) => (
        <Grid container spacing={0} alignItems="center" justifyContent="center" padding="7px">
          <Grid item xs={0.5} color="#808080">
            <Typography>
              {i() + 1}
            </Typography>
          </Grid>
          <Grid item xs={0.8}>
            <img src={track.album.images[2].url} height="80px" width="80px" style="border-radius:10%"/>
          </Grid>
          <Grid item xs={10}>
              <TrackModal name={track.name} url={track.external_urls.spotify} image={track.album.images[2].url}/>
            <For each={track.artists}>
              {(artist, i) => {
                if (track.artists.length === 1) {
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
                } else if (track.artists.length - 1 === i()) {
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

export default TopTracks;