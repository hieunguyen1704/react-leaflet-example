import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

export default function DateTimePicker(props) {
  const classes = useStyles();
  const { setTimeData } = props;
  const [state, setState] = useState({
    startTime: "2021-02-04T10:30",
    endTime: "2021-02-04T11:30",
  });
  useEffect(() => {
    setTimeData(state);
  }, [state]);
  const handleTimeChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local-start"
        label="Từ"
        type="datetime-local"
        value={state.startTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="startTime"
        onChange={handleTimeChange}
      />
      <TextField
        id="datetime-local-end"
        label="Đến"
        type="datetime-local"
        value={state.endTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="endTime"
        onChange={handleTimeChange}
        style={{ marginLeft: 48 }}
      />
    </form>
  );
}
