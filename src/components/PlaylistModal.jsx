import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Modal from "@suid/material/Modal";
import Typography from "@suid/material/Typography";
import useTheme from "@suid/material/styles/useTheme";
import { createSignal } from "solid-js";
import Fab from "@suid/material/Fab";
import AddIcon from "@suid/icons-material/Add";
import PlaylistAddIcon from '@suid/icons-material/PlaylistAdd';
import TextField from "@suid/material/TextField";

const PlaylistModal = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const twoFunctions = () => {
    props.onPlaylistClick();
    handleClose();
  }

  return (
    <div>
      <div style="position: fixed">
        <Fab onClick={handleOpen} style={{color:'white', bottom: '40%', right: '9%', position:'fixed', alignSelf: 'flex-end', width:"75px", height:"75px"}} color="success" aria-label="add">
          <PlaylistAddIcon fontSize="large"/>
        </Fab>
      </div>
      <Modal
        open={open()}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "1px solid #32CD32",
            boxShadow: "24px",
            p: 4,
            textAlign: "center",
            height: 250,
            borderRadius: '15px'
          }}
        >
            <Typography color="black" id="modal-modal-title" variant="h5" component="h2">
              Create Playlist
            </Typography>
          <form onSubmit={twoFunctions}>
            <br></br>
            <TextField required value={props.name()} onChange={props.playlistName} color="success" variant="outlined" sx={{width:"300px"}} label="Playlist Name"></TextField>
            <br></br>
            <br></br>
            <Button type="submit" variant="contained" color="success">Create Playlist</Button>
            &nbsp
            <Button variant="contained" color="success" onClick={handleClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default PlaylistModal;