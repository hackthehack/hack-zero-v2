import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSubmissionData } from "../../../store/actions/hackathonActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: theme.spacing(2),
    width: "80vw",
  },
}));

const FileCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          content
        </Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
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
        Messsage: {submission.message}
      </Typography>
      <Typography style={{ textAlign: "center" }} variant="h4">
        Files
      </Typography>
      <Grid container spacing={3} className={classes.root}>
        {submission.files
          ? submission.files.map((file) => {
              return (
                <Grid key={file._id} xs={12} sm={3}>
                  <FileCard />
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
