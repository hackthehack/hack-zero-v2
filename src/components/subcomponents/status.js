import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FiberNewIcon from "@material-ui/icons/FiberNew";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CancelIcon from '@material-ui/icons/Cancel';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1)
  }
}));

export function Status({ label, style, clickable, onclick }) {
  const classes = useStyles();

  const type = value => {
    if (value === "New Hack") {
      return {
        icon: <FiberNewIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#b2d67c", color: "white", borderRadius: ".5rem" }
      };
    } else if (value === "Looking for members") {
      return {
        icon: <VisibilityIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#C792EA", color: "white", borderRadius: ".5rem"  }
      };
    } else if (value === "In Progress") {
      return {
        icon: <AutorenewIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#ebbb63", color: "white", borderRadius: ".5rem"  }
      };
    } else if (value === "Team Closed") {
      return {
        icon: <VisibilityOffIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#80cbc4", color: "white", borderRadius: ".5rem"  }
      };
    } else if (value === "Canceled") {
      return {
        icon: <CancelIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#d5756c", color: "white", borderRadius: ".5rem"  }
      };
    } else if (value === "Submitted") {
      return {
        icon: <PublishIcon style={{ color: "white" }} />,
        color: { backgroundColor: "#82AAFF", color: "white", borderRadius: ".5rem"  }
      };
    }
    return {
      icon: <NotInterestedIcon style={{ color: "white" }} />,
      color: { backgroundColor: "grey", color: "white", borderRadius: ".5rem"  }
    };
  };

  return (
    <Chip
      label={label}
      className={classes.chip}
      style={style ? type(style).color : null}
      clickable={clickable}
      onClick={clickable ? onclick : null}
      icon={type(style).icon}
    />
  );
}

export default Status;
