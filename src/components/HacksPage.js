import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Hacks = () => {
  const classes = useStyles();
  const [hacks, setHacks] = useState([
    { name: "test1", title: "eggg", description: "eggs?" },
    { name: "test2", title: "egg2", description: "more eggs" },
    { name: "test3", title: "egg heaven", description: "get more eggs" }
  ]);
  const renderHacks = () => {
    return hacks.map(hack => {
      return (
        <Grid item xs={12}>
          <Paper key={hack.title}>
            <h2>{hack.name}</h2>
            <h3>{hack.title}</h3>
            <h4>{hack.description}</h4>
          </Paper>
        </Grid>
      );
    });
  };
  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {renderHacks()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hacks;
