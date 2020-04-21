import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSubmissionData } from "../../../store/actions/hackathonActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(2),
    width: "80vw",
  },
}));

const SubmissionDetail = ({ dispatch, submission }) => {
  const classes = useStyles();
  useEffect(() => {
    dispatch(getSubmissionData());
  }, [dispatch]);
  if (!submission) {
    return null;
  }
  return (
    <Paper className={classes.root}>
      <Typography style={{ textAlign: "center" }} variant="h4">
        Submission Detail
      </Typography>
      <Typography style={{ textAlign: "center" }} variant="h6">
        {submission.message}
      </Typography>
    </Paper>
  );
};
const mapState = (state) => ({
  submission: state.hack.submission,
});
export default connect(mapState)(SubmissionDetail);
