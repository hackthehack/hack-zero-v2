import React, { useState, useEffect } from "react";
import Axios from "axios";

// UI imports
import { Grid, Typography, Paper, Button, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  rightFeild: {
    textAlign: "right"
  }
}));

function HackDetails(props) {
  const classes = useStyles();

  const [data] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    //console.log(props.match.params);
    if (props.match !== undefined) {
      Axios.get(process.env.REACT_APP_API_URL+"hackdetail/" + props.match.params.id)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setGoal(res.data.goal);
        })
        .then(() => {
          console.log(data);
        });
    } else {
      setTitle("Hack-Zero");
      setDescription(
        "This is where the description/idea for the hack will be displayed when there is one. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus in tortor a molestie. Vestibulum congue, eros et ultricies vehicula, sapien est sollicitudin risus, ut volutpat augue tellus in neque. Aliquam erat volutpat."
      );
      setGoal("To win and get that dosh but also the experience");
    }
  }, [data, props.match]);

  return (
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
          justify="space-between"
          alignItems="center"
          alignContent="center"
          spacing={1}
        >
          <Grid item xs={10}>
            <Chip
              icon={<ErrorOutlineOutlinedIcon />}
              label="status"
              color="secondary"
            />
          </Grid>
          <Grid item xs={2} className={classes.rightFeild}>
            <Button variant="contained" color="primary">
              Join Hack
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Idea:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Goal:</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1">{goal}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Team:</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default HackDetails;
