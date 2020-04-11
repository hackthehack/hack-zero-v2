import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
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
          <Typography key={index} variant="body1" component="div">
            {value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};
const CoolDates = ({ status, time }) => {
  //  console.log(Icon);
  return (
    <div style={{ position: "relative" }}>
      {status === "startDate" ? (
        <EventAvailableIcon color="primary" />
      ) : (
        <EventBusyIcon color="error" />
      )}

      <span
        style={{ marginLeft: "1rem", position: "absolute", bottom: "0.35rem" }}
      >
        {time ? time.substring(0, 10).replace(/-/g, "/") : null}
      </span>
    </div>
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

  userId,
  prizeList
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
          variant="h3"
          component="h3"
        >
          {title}
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard
              id="prize"
              title="Prize"
              values={
                prizeList
                  ? [
                      `1st ${prizeList[0]}`,
                      `2nd ${prizeList[1]}`,
                      `3rd ${prizeList[2]}`
                    ]
                  : []
              }
            />
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
                <CoolDates status="startDate" time={from} />,
                <CoolDates status="endDate" time={to} />
              ]}
              s
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

  from: state.hack.items.from,
  to: state.hack.items.to,
  prizeList: state.hack.items.prizeList
});
export default connect(mapState)(Home);
