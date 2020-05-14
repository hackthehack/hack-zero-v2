import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const whatIsHackathon = [
  "Pure Innovation",
  "Learning something",
  "Experimenting",
  "Scratching a technical itch",
  "Brand new project thinking outside the box",
  "Coding an application",
  "Brainstorming a new facilitation technique",
  "Working through a business problem to find a solution",
  "Working on a technical debt",
  "Anything you want to try",
];
const whyParticipate = [
  "Meet new people and collaborate on new idea",
  "Develop new technical skill",
  "Work with like minded people",
  "Get fed",
  "Have fun",
  "Win great prizes",
];
const About = () => {
  return (
    <div style={{ marginTop: "3rem" }}>
      <CssBaseline />
      <Container>
        <Grid direction="column" container>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              What is a Hackathon?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              The purpose of the hack day is to bring IAG communities closer
              together by collaborating on different ideas. Some example hacks:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {whatIsHackathon.map((hack, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText primary={`* ${hack}`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Why should I participate?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {whyParticipate.map((reason, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText primary={`* ${reason}`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
