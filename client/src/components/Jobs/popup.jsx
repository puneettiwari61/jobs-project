import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { connect } from "react-redux";
import { updateLoggedCandidate } from "../../store/actions";

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [errmsg, setErrmsg] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(comment, "hello from hi");
    if (comment) {
      Axios.post(
        `/api/v1/candidates/jobs`,
        { _id: props.id, comment: comment },
        {
          headers: { authorization: JSON.parse(localStorage.jobUser).token }
        }
      )
        .then(res => {
          if (res.data.success) {
            props.dispatch(
              updateLoggedCandidate({ currentCandidate: res.data.candidate })
            );
          }
          console.log("from candidate job apply", res);
        })
        .catch(err => console.log(err));
      setOpen(false);
    } else {
      setErrmsg("cannot be left blank");
    }
  };
  console.log(props.hired, props.id, "helooooooooooooo  form jobs");
  return (
    <div>
      {props.hired.includes(props.candidate.currentCandidate._id) ? (
        <span>Already Applied</span>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Apply
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Explain in a few words, why you are the perfect fit for this job?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            *please note that once updated this field cannot be changed
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            onChange={e => setComment(e.target.value)}
            fullWidth
          />
          <p>{errmsg}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapToProps({ candidate }) {
  return { candidate };
}

export default connect(mapToProps)(FormDialog);
