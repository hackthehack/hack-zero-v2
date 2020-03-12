import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
  },
  field: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
    width: "90vw"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function CreateHack(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [show, setShow] = useState(false);

  const history = props.history

  const handleSubmit = event => {
    event.preventDefault();
    setShow(true);
    const obj = {
      title: title,
      description: description,
      goal: goal
    };
    Axios.post(process.env.REACT_APP_API_URL + "addhack", obj).then(res => {
      console.log(res);
    })
    // .then(history.goBack());
  };

  const renderHack = () => {
    if (show === true) {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          alignContent="center"
        >
          <Paper elevation={2}>
            <Typography alt="title" variant="h2" component="h2">
              {title}
            </Typography>
            <Typography alt="description" variant="h4" component="h4">
              {description}
            </Typography>
          </Paper>
        </Grid>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <form width={1} noValidate autoComplete="false" onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          alignContent="center"
        >
          <Paper className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              alignContent="center"
            >
              <Grid className={classes.field} item xs={12}>
                <Typography variant="h4">New Hack Idea</Typography>
              </Grid>
              <Grid className={classes.field} item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Hack Name
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Hack Name"
                    name="title"
                    onChange={event => {
                      setTitle(event.target.value);
                    }}
                    value={title}
                    labelWidth={85}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid className={classes.field} item xs>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Hack Description
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Hack Description"
                    name="description"
                    onChange={event => {
                      setDescription(event.target.value);
                    }}
                    value={description}
                    multiline
                    rows={5}
                    labelWidth={125}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid className={classes.field} item xs>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Hack Goal
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Hack Goal"
                    name="goal"
                    onChange={event => {
                      setGoal(event.target.value);
                    }}
                    value={goal}
                    multiline
                    rows={5}
                    labelWidth={125}
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item xs>
                <Button
                  type="submit"
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Create Hack
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
      {renderHack()}
    </div>
  );
}

export default CreateHack;
