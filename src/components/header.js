import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  List,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import ViewListIcon from "@material-ui/icons/ViewList";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  loginbutton: {
    marginRight: theme.spacing(2),
  },
  userMenu: {
    right: theme.spacing(1),
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
  },
  userLinks: {
    justifyContent: "space-between",
  },
}));

export const Header = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleLogout = () => {
    const { history } = props;
    props.logout(history);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const links = ["/", "/create", "/hacks", "/about"];
  const displayLinkIcon = (index) => {
    switch (index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <AddIcon />;
      case 2:
        return <ViewListIcon />;
      case 3:
        return <HelpIcon />;
      default:
        return "/";
    }
  };
  const LogoutLinks = () => (
    <div>
      <Link to="/" className={classes.link}>
        <Button color="inherit" className={classes.loginbutton}>
          Home
        </Button>
      </Link>
      <Link to="/hacks" className={classes.link}>
        <Button color="inherit" className={classes.loginbutton}>
          Hacks
        </Button>
      </Link>
      <Link to="/about" className={classes.link}>
        <Button color="inherit" className={classes.loginbutton}>
          About
        </Button>
      </Link>
    </div>
  );
  const LoginLinks = () => (
    <div>
      <Link to="/" className={classes.link}>
        <Button color="inherit" className={classes.loginbutton}>
          Home
        </Button>
      </Link>
      <Link to="/hacks" className={classes.link}>
        {" "}
        <Button color="inherit" className={classes.loginbutton}>
          Hacks
        </Button>
      </Link>
      <Link to="/create" className={classes.link}>
        {" "}
        <Button color="inherit" className={classes.loginbutton}>
          Create
        </Button>
      </Link>
      <Link to="/About" className={classes.link}>
        {" "}
        <Button color="inherit" className={classes.loginbutton}>
          About
        </Button>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.userLinks}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              data-testid="toggleButton"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, false && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{ display: "inline-block" }}
              className="LinksMobileView"
            >
              {props.auth.isAuth ? <LoginLinks /> : <LogoutLinks />}
            </div>
          </div>

          {!props.auth.isAuth ? (
            <div className="LinksMobileView">
              <Link to="/login" className={classes.link}>
                <Button color="inherit" className={classes.loginbutton}>
                  Login
                </Button>
              </Link>
              <Link to="/register" className={classes.link}>
                <Button color="inherit" className={classes.loginbutton}>
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                className={classes.loginbutton}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List data-testid="drawerComponent">
          {links.map((text, index) => {
            // dirty fix to capitalize the first letter of the route
            // *** /create -----> Create in the side nav
            // **** /hacks ------> Hacks in the side nav
            let displayLinkText;
            displayLinkText =
              text.substr(1).charAt(0).toUpperCase() + text.slice(2);
            return (
              <ListItem
                onClick={handleDrawerClose}
                component={Link}
                to={`${text}`}
                button
                key={text}
              >
                <ListItemIcon>{displayLinkIcon(index)}</ListItemIcon>
                {text === "/" ? (
                  <ListItemText primary={"Home"} />
                ) : (
                  <ListItemText primary={displayLinkText} />
                )}
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState, mapDispatchToProps)(withRouter(Header));
