import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Hack Zero
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Login = props => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      setPassword("");
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    props.auth(email, password, history).then(() => {
      setPassword("");
      setEmail("");
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography data-testid="login-heading" component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2} justify="center">
          {props.loginStatus === "EXPIRED" ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Your Session has expired please login agin
                </Typography>
              </Grid>
              ) : null}
            <Grid item xs={12}>
              <TextField
                value={email}
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                type="password"
                id="password"
                label="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                data-testid="login-button"
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                {props.loginStatus === "PENDING" ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
            {props.loginStatus === "FAILED" ? (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" align="center">
                  Username or Password is incorrect
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
const mapDispatch = dispatch => ({
  auth: (email, password, history) => dispatch(login(email, password, history))
});

const mapState = state => ({
  loginStatus: state.auth.loginStatus
});
export default connect(mapState, mapDispatch)(Login);
