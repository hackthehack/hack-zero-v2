import React from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import Copyright from "./subcomponents/copyright";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles"
import RegisterForm from "./subcomponents/registrationValidation/registration-form";
import RegistrationComplete from './subcomponents/registrationValidation/registration-complete'
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

export function Register(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {props.registerStatus === "SUCCESS" ? <RegistrationComplete/> : <RegisterForm status={props.registerStatus}/>}
      </div>
      {!props.registerError ? null : (
        <Box mt={5}>
          <Typography variant="body2" color="error" align="center">
            {props.registerError}
          </Typography>
        </Box>
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapState = state => ({
  registerStatus: state.auth.registerStatus,
  registerError: state.auth.registerError
});

export default connect(mapState)(Register);
