import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  chipMArgin: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export function Team(props) {
  const classes = useStyles();
  if (props.team !== undefined) {
    return (
        <>
          {props.team.map(id => {
            props.users.map((_id,name) => {
              if(_id === id){
                return (
                  <Chip
                    key={id}
                    className={classes.chipMArgin}
                    icon={<AccountCircleIcon />}
                    label={name}
                    color="primary"
                  />
                );
              } else {
                return <></>
              }
            })
            return <></>
          })}
          </>
    );
  } else {
    return <></>;
  }
}

const mapState = state => ({
  users: state.user.users
});

export default connect(mapState)(Team);
