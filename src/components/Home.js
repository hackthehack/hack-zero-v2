import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CoolDates from "./subcomponents/CoolDates";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { getHackathonContent } from "../store/actions/hackathonActions";
import { FaMedal } from "react-icons/fa";
import MyHacks from "./MyHacks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
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

export const Home = ({
  from,
  to,
  dispatch,
  hackathon,
  title,
  information,
  status,
  theme,
  assets,
  userId,
  prizeList,
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
                      <div>
                        <FaMedal style={{ color: "#FFD700" }} />
                        {prizeList[0]}
                      </div>,
                      <div>
                        <FaMedal style={{ color: "#C0C0C0" }} />
                        {prizeList[1]}
                      </div>,
                      <div>
                        <FaMedal style={{ color: "#CD7F32" }} />
                        {prizeList[2]}
                      </div>,
                    ]
                  : []
              }
            />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard id="status" title="Status" values={[status]} />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard
              id="theme"
              title="Theme"
              values={[
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{theme}</p>
                  {assets[2] ? (
                    <img
                      alt="hack-event-thumbnail"
                      className="imageFrame"
                      src={`https:${assets[2].fields.file.url}`}
                    />
                  ) : null}
                </div>,
              ]}
            />
          </Grid>
          <Grid style={{ display: "flex" }} item xs={12} sm={6}>
            <FixedCard
              id="schedule"
              title="Schedule"
              values={[
                <CoolDates status="startDate" time={from} />,
                <CoolDates status="endDate" time={to} />,
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
const mapState = (state) => ({
  title: state.hack.items.title,
  information: state.hack.items.information,
  status: state.hack.items.status,
  theme: state.hack.items.theme,
  assets: state.hack.assets,
  from: state.hack.items.from,
  to: state.hack.items.to,
  prizeList: state.hack.items.prizeList,
});
export default connect(mapState)(Home);
