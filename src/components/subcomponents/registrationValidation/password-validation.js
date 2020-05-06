import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";

export const passwordSecureCheck = (password, confirmPassword) => {
  return null;
};

const useStyles = makeStyles(theme => ({
  pass: {
    color: "#4caf50",
    verticalAlign: "middle"
  },
  fail: {
    color: "#d50000",
    verticalAlign: "middle"
  },
  margin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  icon: {
    fontSize: "1.3rem",
    marginRight: theme.spacing(1),
    verticalAlign: "text-bottom"
  }
}));

export function PasswordValidation({ password, confirmPassword }) {
  const classes = useStyles();
  const length = password.length >= 8;
  const capital = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const special = /[!@#$%&*?]/.test(password);
  const confirm = (confirmPassword === password && length);
  const conditionColor = condition => {
    if (condition) {
      return classes.pass;
    }
    return classes.fail;
  };

  const conditionIcon = condition => {
    if (condition) {
      return <CheckCircleIcon className={classes.icon}/>;
    }
    return <CancelIcon className={classes.icon}/>;
  };

  return (
    <Grid container direction="row" className={classes.margin}>
      <Grid item xs={12}>
        <Typography variant="body1" className={conditionColor(length)}>
          {conditionIcon(length)}Password must have a minimum of 8 characters
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={conditionColor(capital)}>
          {conditionIcon(capital)}
          Password must contain a capital letter
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={conditionColor(number)}>
          {conditionIcon(number)}
          Password must contain a number
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={conditionColor(special)}>
          {conditionIcon(special)}
          Password must contain a special character
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={conditionColor(confirm)}>
          {conditionIcon(confirm)}Confirmation password must match
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PasswordValidation;
