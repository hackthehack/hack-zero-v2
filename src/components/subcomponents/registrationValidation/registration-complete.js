import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { clearRegister } from "../../../store/actions/authActions";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

export function RegistrationComplete(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Registration Successful
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          you may now proceed to the login page and begin using the hack day app
        </Typography>
      </Grid>
      <Grid item>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" onClick={props.clear}>
            Login
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

const mapDispatch = dispatch => ({
  clear: () => dispatch(clearRegister())
});


export default connect(null,mapDispatch)(RegistrationComplete);