import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getHackathonContent } from "../store/actions/hackathonActions";

const Home = ({ dispatch, hackathon, title }) => {
  useEffect(() => {
    dispatch(getHackathonContent());
  }, [dispatch]);
  console.log(title);
  return (
    <div>
      <Typography
        style={{ textAlign: "center", margin: "2rem" }}
        variant="h2"
        component="h2"
      >
        {title}
      </Typography>
    </div>
  );
};
const mapState = state => ({ title: state.hack.items.title });
export default connect(mapState)(Home);
