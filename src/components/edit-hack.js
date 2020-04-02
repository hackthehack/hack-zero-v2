import React, { useState } from "react";
import TeamEdit from "./subcomponents/hack-team-edit";
import { editingHackIdea } from "../store/actions/userActions";
import { clearingHackDetails } from "../store/actions/hackathonActions";

// UI imports
import {
  Grid,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Button,
  FormControl,
  OutlinedInput
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "80vw"
  },
  rightFeild: {
    textAlign: "right"
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  chipMArgin: {
    marginRight: theme.spacing(1)
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  marginFix: {
    marginLeft: theme.spacing(0.1),
    marginRight: theme.spacing(0.1),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  }
}));

export function EditHack({ dispatch, hackDetails, history }) {
  const classes = useStyles();

  const [updateData, setUpdateData] = useState({});

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const onSubmitUpdate = e => {
    e.preventDefault();
    dispatch(editingHackIdea(updateData))
    dispatch(clearingHackDetails())
    history.goBack()
  };

  if (hackDetails) {
    return (
      <Grid
        data-testid="main-container"
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        alignContent="center"
      >
        <Paper className={classes.root}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            alignContent="center"
            spacing={1}
          >
            <Grid item xs={9}>
              <Chip
                icon={<ErrorOutlineOutlinedIcon />}
                label="status"
                color="secondary"
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Hack Name:</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  onChange={handleOnChange}
                  placeholder="Title"
                  name="title"
                  multiline
                  rows="1"
                  defaultValue={hackDetails.title}
                ></OutlinedInput>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Idea:</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  onChange={handleOnChange}
                  placeholder="Description"
                  name="description"
                  multiline
                  rows="3"
                  defaultValue={hackDetails.description}
                ></OutlinedInput>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Goal:</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  onChange={handleOnChange}
                  placeholder="Goal"
                  name="goal"
                  multiline
                  rows="3"
                  defaultValue={hackDetails.goal}
                ></OutlinedInput>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TeamEdit
                team={hackDetails.team}
                name={hackDetails.teamName}
                handleOnChange={handleOnChange}
              />
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              className={classes.marginFix}
              spacing={1}
            >
              <Grid item>
                <Button
                  onClick={onSubmitUpdate}
                  color="primary"
                  variant="outlined"
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    history.push((`/hacks/${hackDetails._id}`));
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
  return (
    <Grid
      data-testid="main-container"
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      alignContent="center"
      className={classes.loading}
    >
      <CircularProgress />
    </Grid>
  );
}

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails
});

export default connect(mapState)(EditHack);
