import React, { useState, useEffect } from "react";
import Axios from "axios";
import Team from "./subcomponents/team";
import JoinButton from "./subcomponents/join-team-button";
import UrlJoin from "url-join";
import EditHack from "./subcomponents/edit-hack-button";
import HackField from "./subcomponents/hack-field";

// UI imports
import {
  Grid,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  rightFeild: {
    textAlign: "right"
  },
  loading: {
    marginTop: theme.spacing(10)
  },
  chipMArgin: {
    marginRight: theme.spacing(1)
  },
  marginFix: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  }
}));

export function HackDetails(props) {
  const classes = useStyles();

  const [displayData, setDsiplayData] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (props.match !== undefined) {
      Axios.get(
        UrlJoin(
          process.env.REACT_APP_API_URL,
          "hackdetail/",
          props.match.params.id
        )
      ).then(res => {
        setDsiplayData(res.data);
      });
    }
  }, [props.match]);

  const joinHack = () => {
    const object = {
      hackId: props.match.params.id,
      userId: props.userId
    };
    Axios.post(UrlJoin(process.env.REACT_APP_API_URL, "joinhack"), object).then(
      res => {
        setDsiplayData(res.data);
      }
    );
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const onSubmitUpdate = e => {
    e.preventDefault();
    Axios.post(UrlJoin(process.env.REACT_APP_API_URL, "edithack"), {
      ...updateData,
      hackId: displayData._id
    }).then(res => {
      setEdit(false);
      setDsiplayData(res.data);
    });
  };

  const editHackDetails = () => {
    setEdit(true);
  };

  if (displayData !== null) {
    return (
      <Grid
        data-testid="main-container"
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        alignContent="center"
      >
        <Paper className={classes.root}>
          <form>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              alignContent="center"
              spacing={2}
            >
              <Grid item xs={9}>
                <Chip
                  icon={<ErrorOutlineOutlinedIcon />}
                  label="status"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={3} className={classes.rightFeild}>
                <JoinButton
                  team={displayData.team}
                  userId={props.userId}
                  joinHack={joinHack}
                />
              </Grid>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                alignContent="center"
                spacing={1}
                className={classes.marginFix}
              >
                <Grid item xs={edit ? 12 : null}>
                  <HackField
                    onChange={handleOnChange}
                    edit={edit}
                    name={"title"}
                    displayText={displayData.title}
                    variant={"h4"}
                  />
                </Grid>
                {edit ? null : (
                  <Grid item>
                    <EditHack
                      edit={edit}
                      team={displayData.team}
                      userId={props.userId}
                      editFunc={editHackDetails}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Idea:</Typography>
              </Grid>
              <Grid item xs={12}>
                <HackField
                  onChange={handleOnChange}
                  edit={edit}
                  name={"description"}
                  displayText={displayData.description}
                  variant={"body1"}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Goal:</Typography>
              </Grid>
              <Grid item xs={12}>
                <HackField
                  onChange={handleOnChange}
                  edit={edit}
                  name={"goal"}
                  displayText={displayData.goal}
                  variant={"body1"}
                />
              </Grid>
              {edit ? (
                <Grid
                  container
                  justify="flex-start"
                  alignItems="center"
                  className={classes.marginFix}
                  spacing={1}
                >
                  <Grid item>
                    <Button
                      onClick={onSubmitUpdate}
                      color="primary"
                      variant="outlined"
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={e => {
                        setEdit(false);
                      }}
                      color="secondary"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
              {displayData.team !== undefined ? (
                <Grid item xs={12}>
                  <Typography variant="h6">Team Members:</Typography>
                </Grid>
              ) : null}

              <Grid item xs={10}>
                <Team team={displayData.team} />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
  return (
    <Grid
      data-testid="main-container"
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      alignContent="center"
      className={classes.loading}
    >
      <CircularProgress />
    </Grid>
  );
}

const mapState = state => ({
  userId: state.auth.userId
});

export default connect(mapState)(HackDetails);
