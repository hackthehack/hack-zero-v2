import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  List
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import ViewListIcon from "@material-ui/icons/ViewList";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  loginbutton: {
    marginRight: theme.spacing(2)
  },
  userMenu: {
    right: theme.spacing(1)
  },
  link: {
    color: "#ffffff",
    textDecoration: "none"
  },
  userLinks: {
    justifyContent: "space-between"
  }
}));

export function Header(props) {
  // eslint-disable-next-line
  // const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const links = ["/", "/create", "/hacks"];
  const displayLinkIcon = index => {
    switch (index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <AddIcon />;
      case 2:
        return <ViewListIcon />;
      default:
        return "/";
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar className={classes.userLinks}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            data-testid="toggleButton"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {props.auth.isAuth ? (
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
                getContentAnchorEl={null}
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
                className={classes.userMenu}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
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
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper
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
              text
                .substr(1)
                .charAt(0)
                .toUpperCase() + text.slice(2);
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
}

const mapState = state => ({
  auth: state.auth
});

export default connect(mapState)(Header);
