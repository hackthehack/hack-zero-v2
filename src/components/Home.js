import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getHackathonContent } from "../store/actions/hackathonActions";

const Home = ({ dispatch, hackathon }) => {
  useEffect(() => {
    dispatch(getHackathonContent());
  }, [dispatch]);
  return <h1>Hackathon Home page</h1>;
};
const mapState = state => ({ hackathon: state.hack.hackathon });
export default connect(mapState)(Home);
