import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import {
  getHackathonContent,
  getAssignedHacks
} from "../store/actions/hackathonActions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const FixedCard = ({ id, title, values }) => {
  return (
    <Card data-testid={`${id}-card`} style={{ width: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>

        {values.map((value, index) => (
          <Typography key={index} variant="body2" component="p">
            {value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};
const displayUserAssignedHacks = assignedHacks => {
  return assignedHacks.map(hack => {
    return (
      <Grid style={{ display: "flex" }} key={hack._id} item xs={12} sm={4}>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Title: {hack.title}
            </Typography>
            <Typography color="textSecondary" variant="body2" component="p">
              <span style={{ color: "dodgerBlue" }}>Description:</span>{" "}
              {hack.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  });
};
export const Home = ({
  from,
  to,
  dispatch,
  hackathon,
  title,
  information,
  status,
  theme,
  price,
  isAuth,
  userId,
  assignedHacks
}) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(getHackathonContent());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuth) {
      console.log("from home page");
      console.log("user not loggedin");
      return;
    }
    dispatch(getAssignedHacks(userId));
  }, [dispatch, isAuth, userId]);
  // will show all the hacks that logged in user are assigned to
  // will not show any assiggned hacks if user are not loggedin
  return (
    <div className={classes.root}>
      <Container component="main">
        <CssBaseline />
        <Typography
          data-testid="page-header"
          style={{ textAlign: "center", margin: "2rem" }}
          variant="h2"
          component="h2"
        >
          {title}
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard id="price" title="Price" values={[price]} />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard id="status" title="Status" values={[status]} />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard id="theme" title="Theme" values={[theme]} />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard
              id="schedule"
              title="Schedule"
              values={[`From: ${from}`, `To: ${to}`]}
            />
          </Grid>
          <Grid item xs={12}>
            <FixedCard
              id="information"
              title="Information"
              values={[information]}
            />
          </Grid>
        </Grid>
        <Typography
          style={{ textAlign: "center", margin: "2rem" }}
          variant="h2"
          component="h2"
        >
          Your are part of:
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {displayUserAssignedHacks(assignedHacks)}
        </Grid>
      </Container>
    </div>
  );
};
const mapState = state => ({
  title: state.hack.items.title,
  information: state.hack.items.information,
  status: state.hack.items.status,
  theme: state.hack.items.theme,
  price: state.hack.items.price,
  from: state.hack.items.from,
  to: state.hack.items.to,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
  assignedHacks: state.hack.assignedHacks
});
export default connect(mapState)(Home);
