import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSubmissionData } from "../../../store/actions/hackathonActions";
import FileCard from "../FileCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(3),
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
      <Typography style={{ textAlign: "left" }} variant="h4">
        Submission Detail
      </Typography>
      <div>
        <Typography style={{ textAlign: "left" }} variant="h6">
          Messsage:
        </Typography>
        <Typography variant="body1">{submission.message}</Typography>
      </div>

      <Typography style={{ textAlign: "left" }} variant="h6">
        Files:
      </Typography>
      <Grid container spacing={3} className={classes.root}>
        {submission.files
          ? submission.files.map((file) => {
              return (
                <Grid key={file._id} xs={12} sm={3}>
                  <FileCard
                    name={file.name}
                    size={file.size}
                    type={file.type}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Paper>
  );
};
const mapState = (state) => ({
  submission: state.hack.submission,
});
export default connect(mapState)(SubmissionDetail);
