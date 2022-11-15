import Grid from "@suid/material/Grid";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import ArtistModal from './ArtistModal.jsx';
import ToggleButton from "@suid/material/ToggleButton";
import ToggleButtonGroup from "@suid/material/ToggleButtonGroup";
import { createSignal } from "solid-js";
import TextField from "@suid/material/TextField";

const ArtistList = (props) => {

  return (
      <Box sx={{backgroundColor: 'black', minHeight:'800px'}}>
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
      <For each={props.topArtists()}>
        {(artist, i) => (
          <Grid container spacing={0} alignItems="center" justifyContent="center" padding="7px">
            <Grid item xs={0.5} color="#808080">
              <Typography>
                {i() + 1}
              </Typography>
            </Grid>
            <Grid item xs={0.8}>
              <img src={artist.images[2].url} height="80px" width="80px" style="border-radius: 10%"/>
            </Grid>
            <Grid item xs={10}>
                <ArtistModal name={artist.name} url={artist.external_urls.spotify} image={artist.images[2].url} followers={artist.followers.total}/>
              <For each={artist.genres}>
                {(genre, i) => {
                  if (artist.genres.length === 1) {
                    return (
                      <span style={{color:'grey'}}>
                        &nbsp&nbsp&nbsp&nbsp{genre}
                      </span>
                    )
                  } else if (i() === 0) {
                    return (
                      <span style={{color:'grey'}}>
                        &nbsp&nbsp&nbsp&nbsp{genre}, &nbsp
                      </span>
                    )
                  } else if (artist.genres.length - 1 === i()) {
                    return (
                      <span style={{color:"grey"}}>
                        {genre}
                      </span>
                    )
                  } else {
                    return (
                      <span style={{color:"grey"}}>
                        {genre}, &nbsp
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

export default ArtistList;