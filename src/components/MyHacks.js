import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { getAssignedHacks } from "../store/actions/hackathonActions";
import { connect } from "react-redux";

const UserAssignedHacks = ({ assignedHacks }) => {
  return assignedHacks.map(hack => {
    return (
      <Grid
        data-testid="assignedHack"
        style={{ display: "flex" }}
        key={hack._id}
        item
        xs={12}
        sm={4}
      >
        <Card
          style={{ width: "100%", textDecoration: "none" }}
          component={Link}
          to={`/hack/${hack._id}`}
        >
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
export const MyHacks = ({ isAuth, assignedHacks, userId, dispatch }) => {
  useEffect(() => {
    dispatch(getAssignedHacks());
  }, [dispatch]);
  return (
    <div>
      <Typography
        style={{ textAlign: "center", margin: "2rem" }}
        variant="h2"
        component="h2"
      >
        Your are part of: {assignedHacks.length} hacks
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        <UserAssignedHacks assignedHacks={assignedHacks} />
      </Grid>
    </div>
  );
};
const mapState = state => ({
  assignedHacks: state.hack.assignedHacks,
  isAuth: state.auth.isAuth
  //userId: state.auth.userId
});
export default connect(mapState)(MyHacks);
