import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { getHackathonContent } from "../store/actions/hackathonActions";

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

const Home = ({
  from,
  to,
  dispatch,
  hackathon,
  title,
  information,
  status,
  theme,
  price
}) => {
  const classes = useStyles();
  const scheduleCard = (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Schedule:
        </Typography>

        <Typography variant="body2" component="p">
          From: {from}
        </Typography>
        <Typography variant="body2" component="p">
          To: {to}
        </Typography>
      </CardContent>
    </Card>
  );
  const priceCard = (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Price:
        </Typography>

        <Typography variant="body2" component="p">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
  const themeCard = (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Theme:
        </Typography>

        <Typography variant="body2" component="p">
          {theme}
        </Typography>
      </CardContent>
    </Card>
  );
  const statusCard = (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Status:
        </Typography>

        <Typography variant="body2" component="p">
          {status}
        </Typography>
      </CardContent>
    </Card>
  );
  const informationCard = (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Information:
        </Typography>

        <Typography variant="body2" component="p">
          {information}
        </Typography>
      </CardContent>
    </Card>
  );
  useEffect(() => {
    dispatch(getHackathonContent());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container component="main">
        <CssBaseline />
        <Typography
          style={{ textAlign: "center", margin: "2rem" }}
          variant="h2"
          component="h2"
        >
          {title}
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            {priceCard}
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            {statusCard}
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            {themeCard}
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12}>
            {informationCard}
          </Grid>
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
  to: state.hack.items.to
});
export default connect(mapState)(Home);
