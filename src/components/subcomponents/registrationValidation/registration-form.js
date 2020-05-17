import React, {useState} from "react";
import {
  CircularProgress,
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import PasswordValidation from "./password-validation";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { register } from '../../../store/actions/authActions'

export const passwordSecureCheck = (password, confirmPassword) => {
  return null;
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function RegisterForm(props) {
  const classes = useStyles();

  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    props.register(fName, lName, email, password, confirmPassword);
  };

  return (
    <form className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            onChange={event => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            onChange={event => setLastName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
        </Grid>
        <PasswordValidation
          password={password}
          confirmPassword={confirmPassword}
        />
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setConfirmPassword(event.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        {props.status === "PENDING" ? (
          <CircularProgress size="1.5rem" />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}

const mapDispatch = dispatch => ({
  register: (firstName, lastName, email, password, confirmPassword) =>
    dispatch(register(firstName, lastName, email, password, confirmPassword))
});


export default connect(null,mapDispatch)(RegisterForm);
