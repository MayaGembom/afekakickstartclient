import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import {pladgeProject } from '../actions/posts';
import { useDispatch } from 'react-redux';



export default function FormDialog(props) {
const postid = props.p;
const dispatch = useDispatch();
const [open, setOpen] = React.useState(false);
const [pledge, setPledge] = React.useState(500);
const [values, setValues] = React.useState({
  amount: "",
});

    const handleChange = (prop) => (event) => {
        console.log(event.target.value)
        setPledge(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handlePledge = (prop) => (event) => {

        dispatch(pladgeProject(postid, pledge))
        setOpen(false);
    };

  return (
    <center>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Pledge This Project
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In Order to pledge this project please enter the amount you wish
              to support
            </DialogContentText>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Pledge
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={values.amount}
                type="number"
                onChange={handleChange("amount")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlePledge("amount")}>pledge</Button>
          </DialogActions>
        </Dialog>
      </div>
    </center>
  );
}