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

  const [files, setFiles] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (submission !== null) {
      setSubmitMessage(submission.message);
      submission.files.map((file, index) => {
        setFiles({ ...files, [index]: file });
      });
    }
  }, [files, match.params.id, submission]);

  const handelSubmit = () => {
    dispatch(submitHackIdea({ message: submitMessage, files: files }));
    // setSubmitMessage(submission.message);
  };
  if (true) {
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
              <Typography variant="h5">
                {hackDetails.title} Submission
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.margin}>
              <SubmitDetails
                message={submitMessage}
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
                Submit
              </Button>
              <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    history.push((`/hack/${hackDetails._id}`));
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
  hackDetails: state.hack.hackDetails,
  submission: state.hack.submission
});

export default connect(mapState)(SubmitHack);
