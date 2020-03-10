import React from "react";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  loginbutton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link:{
    color: '#ffffff',
    textDecoration: 'none'
  }
}));

export default function Header(props) {
  // eslint-disable-next-line
  const [auth, setAuth] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBS = event =>{
    if(login){
      setLogin(false)
    }else{
      setLogin(true)
    }
  }

  const buttonType = () => {
    if (auth) {
      return (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      );
    } else if (login) {
      return (
        <Link to="/register" className={classes.link}>
          <Button color="inherit" className={classes.loginbutton} onClick={handleBS}>
            Register
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to="/login" className={classes.link}>
          <Button color="inherit" className={classes.loginbutton} onClick={handleBS}>
            Login
          </Button>
        </Link>
      );
    }
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hack Zero
        </Typography>
        {buttonType()}
      </Toolbar>
    </AppBar>
  );
}
