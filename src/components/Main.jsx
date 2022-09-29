import axios from 'axios';
import { onMount, createSignal, Switch, Match, createEffect } from 'solid-js';
import ArtistList from './ArtistList.jsx';
import TopTracks from './TopTracks.jsx';
import RecentlyPlayed from './RecentlyPlayed.jsx';
import Button from "@suid/material/Button";
import Typography from "@suid/material/Typography";
import Box from "@suid/material/Box";
import { Route, Routes, Link } from 'solid-app-router';

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

const Main = () => {
  const [topArtists, setTopArtists] = createSignal('');
  const [tracks, setTracks] = createSignal('');
  const [recents, setRecents] = createSignal('');
  const [tab, setTab] = createSignal('topArtists');
  const [topArtistsDuration, setTopArtistsDuration] = createSignal('long_term');
  const [topTracksDuration, setTopTracksDuration] = createSignal('long_term');
  const [recentLimit, setRecentLimit] = createSignal(10);
  const [userID, setUserID] = createSignal('');
  const [playlistName, setPlaylistName] = createSignal('');
  const [trackURI, setTrackURI] = createSignal('');
  const [recentURI, setRecentURI] = createSignal('');
  const [artistLimit, setArtistLimit] = createSignal(10);
  const [trackLimit, setTrackLimit] = createSignal(10);

  onMount(() => {
    if (window.location.hash) {
      let { access_token, expires_in, token_type } = getParams(window.location.hash);
      localStorage.clear();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expires_in", token_type);
      localStorage.setItem("token_type", token_type);
    }

    axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
        }
    })
    .then((response) => {
      setUserID(response.data.id)
    })
    .catch((err) => {
      console.log(err);
    })
  })

  createEffect(() =>
    axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
        },
        params: {
          limit: artistLimit(),
          offset: 0,
          time_range: topArtistsDuration()
        }
      })
        .then((response) => {
          console.log(response.data.items)
          setTopArtists(response.data.items);
        })
        .catch((err) => {
          console.log(err);
        })
  )

  createEffect(() =>
    axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
        },
        params: {
          limit: trackLimit(),
          offset: 0,
          time_range: topTracksDuration()
        }
      })
        .then((response) => {
          console.log(response.data.items);
          let temp = [];
          setTracks(response.data.items);
          for (let element of response.data.items) {
            temp.push(element.uri);
          }
          setTrackURI(temp);
        })
        .catch((err) => {
          console.log(err);
        })
  )

  createEffect(() =>
    axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      params: {
        limit: recentLimit()
      }
    })
      .then((response) => {
        console.log(response.data.items)
        let temp = [];
        setRecents(response.data.items);
        for (let element of response.data.items) {
          temp.push(element.track.uri);
        }
        setRecentURI(temp);
      })
      .catch((err) => {
        console.log(err);
      })
  )

  const onTopArtistClick = () => {
    setTab('topArtists');
  }

  const onTopTracksClick = () => {
    setTab('topTracks');
  }

  const onRecentClick = () => {
    setTab('recentlyPlayed');
  }

  const onArtistsDurationChange = (event, newTopArtistsDuration) => {
    setTopArtistsDuration(newTopArtistsDuration);
  }

  const onTracksDurationChange = (event, newTopTracksDuration) => {
    setTopTracksDuration(newTopTracksDuration);
  }

  const onRecentLimitChange = (event, newRecentLimit) => {
    setRecentLimit(newRecentLimit);
  }

  const onArtistLimitChange = (event, newArtistLimit) => {
    setArtistLimit(newArtistLimit);
  }

  const onTrackLimitChange = (event, newTrackLimit) => {
    setTrackLimit(newTrackLimit);
  }

  const onPlaylistNameChange = (event, newPlaylistName) => {
    setPlaylistName(newPlaylistName);
  }

  const onPlaylistClick = () => {
    axios.post(`https://api.spotify.com/v1/users/${userID()}/playlists`, { name: playlistName() }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data);
        setPlaylistName('');
        axios.post(`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`, { uris: trackURI()}, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onRecentAdd = () => {
    axios.post(`https://api.spotify.com/v1/users/${userID()}/playlists`, { name: playlistName() }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data);
        setPlaylistName('');
        axios.post(`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`, { uris: recentURI()}, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
    <Box sx={{backgroundColor: "black", padding:"25px", backgroundImage: "url(https://i.postimg.cc/YCCBR1Xg/pexels-min-an-813269.jpg)"}}>
      <Box sx={{height:'100px', justifyContent:'center',textAlign:"center"}}>
      <Typography variant='h3' sx={{color:"white"}}>Slotify</Typography>
        <Button onClick={onTopArtistClick} sx={{color:"#32CD32"}}>Top Artists</Button>
        <Button onClick={onTopTracksClick} sx={{color:"#32CD32"}}>Top Tracks</Button>
        <Button onClick={onRecentClick} sx={{color:"#32CD32"}}>Recently Played</Button>
      </Box>
      <Switch fallback={<div> Loading... </div>}>
          <Match when={tab() === 'topArtists'}>
            <ArtistList topArtists={topArtists} changeHandler={onArtistsDurationChange} duration={topArtistsDuration} limit={artistLimit} onLimitChange={onArtistLimitChange}/>
          </Match>
          <Match when={tab() === 'topTracks'}>
            <TopTracks limit={trackLimit} onLimitChange={onTrackLimitChange} name={playlistName} tracks={tracks} changeHandler={onTracksDurationChange} duration={topTracksDuration} onPlaylistClick={onPlaylistClick} onPlaylistNameChange={onPlaylistNameChange}/>
          </Match>
          <Match when={tab() === 'recentlyPlayed'}>
            <RecentlyPlayed name={playlistName} recents={recents} changeHandler={onRecentLimitChange} limit={recentLimit} onPlaylistClick={onRecentAdd} onPlaylistNameChange={onPlaylistNameChange}/>
          </Match>
      </Switch>
      </Box>
    </div>
  )

}

export default Main;