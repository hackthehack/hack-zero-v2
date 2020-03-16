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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import UrlJoin from "url-join";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    width: "80vw",
    padding: theme.spacing(1)
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

export function CreateHack(props) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [join, setJoin] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(join);
    const obj = {
      title: title,
      description: description,
      goal: goal
    };
    Axios.post(UrlJoin(process.env.REACT_APP_API_URL, "addhack"), obj)
      .then(res => {
        const obj = {
          hackId: res._id,
          userId: props.userId
        }
        Axios.post(UrlJoin(process.env.REACT_APP_API_URL,"joinhack"), obj)
      })
      .then(() => {
        props.history.push("/hacks");
      });
  };

  return (
    <div>
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
              justify="flex-start"
              alignItems="center"
              alignContent="center"
              spacing={1}
            >
              <Grid className={classes.field} item xs={10}>
                <Typography variant="h4">New Hack Idea</Typography>
              </Grid>
              <Grid className={classes.field} item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={join}
                      onChange={event => {
                        setJoin(event.target.checked);
                      }}
                      value="joinHack"
                      color="primary"
                    />
                  }
                  label="Auto Join Hack"
                />
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
              <Grid className={classes.field} item xs={12}>
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
              <Grid className={classes.field} item xs={12}>
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
    </div>
  );
}

const mapState = state => ({
  userId: state.auth.userId
});

export default connect(mapState)(CreateHack);
