import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlert(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { message, type, timeDeleteMessage, setDeleteMessage } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteMessage("");
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={timeDeleteMessage} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
