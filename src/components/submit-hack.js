import React, { useEffect, useState } from "react";
import { submitHackIdea } from "../store/actions/submissionActions";
import { getSubmissionData } from "../store/actions/hackathonActions";
import { connect } from "react-redux";
import SubmitDetails from "./subcomponents/submit/submit-details";
import Upload from "./subcomponents/upload/upload";

// UI imports
import {
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "80vw"
  },
  margin: {
    marginTop: theme.spacing(2)
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  backButton: {
    marginRight: theme.spacing(1)
  }
}));
export function SubmitHack({
  match,
  dispatch,
  submission,
  hackDetails,
  history
}) {
  const classes = useStyles();

  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const handelSubmit = () => {
    setSubmitting(true)
    dispatch(submitHackIdea({ message: submitMessage, files: files }, history));
  };
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
          <Grid item xs={12}>
            <Typography variant="h5">{hackDetails.title} Submission</Typography>
          </Grid>
          <Grid item xs={12} className={classes.margin}>
            <SubmitDetails
              message={submission !== null ? submission.message : ""}
              update={setSubmitMessage}
              className={classes.margin}
            />
          </Grid>
          <Grid item xs={12} className={classes.margin}>
            <Upload
              className={classes.margin}
              files={files}
              setFiles={setFiles}
            />
          </Grid>
          <Grid item xs={12} style={{ float: "left", marginTop: "2rem" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handelSubmit}
              className={classes.backButton}
            >
              {submitting ? <CircularProgress size="1.5rem"/> : "Submit"}
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                history.push(`/hack/${hackDetails._id}`);
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

const mapState = state => ({
  userId: state.auth.userId,
  hackDetails: state.hack.hackDetails,
  submission: state.hack.submission
});

export default connect(mapState)(SubmitHack);
