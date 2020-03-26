import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { getHackathonContent } from "../store/actions/hackathonActions";
import MyHacks from "./MyHacks";

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
  userId
}) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(getHackathonContent());
  }, [dispatch]);

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
              values={[
                `From: ${moment(from).format("DD-MM-YYYY")}`,
                `To: ${moment(to).format("DD-MM-YYYY")}`
              ]}
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
        <MyHacks />
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
