import Box from "@suid/material/Box";
import Grid from "@suid/material/Grid";
import Button from "@suid/material/Button";
import Modal from "@suid/material/Modal";
import Typography from "@suid/material/Typography";
import useTheme from "@suid/material/styles/useTheme";
import { createSignal } from "solid-js";

const TrackModal = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const onOpenSpotify = (e) => {
    e.preventDefault();
    location.href = props.url;
  }

  return (
    <div>
      <Button sx={{width:'auto', color:'white', fontSize: 17.5, borderColor:'black'}} variant="outlined" onClick={handleOpen}>{props.name}</Button>
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
            width: 500,
            bgcolor: "black",
            border: "1px solid #32CD32",
            boxShadow: "24px",
            p: 4,
            textAlign:"center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
            {props.name}
          </Typography>
          <Typography sx={{ mt: 2 }}>
              <img src={props.image} height="120px" width="120px"/>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Button variant="contained" color="success" onClick={onOpenSpotify}>Open In Spotify</Button>
            &nbsp
            <Button variant="contained" color="success" onClick={handleClose}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TrackModal;