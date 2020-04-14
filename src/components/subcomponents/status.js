import React from "react";
import { Chip } from "@material-ui/core";

import NewReleasesIcon from "@material-ui/icons/NewReleases";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CancelIcon from "@material-ui/icons/Cancel";
import PublishIcon from "@material-ui/icons/Publish";

export function Status({ label, style, clickable, onclick }) {

  const type = value => {
    switch (value) {
      case "New Hack":
        return {
          icon: <NewReleasesIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#41b53f",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      case "Looking for members":
        return {
          icon: <VisibilityIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#a73fb5",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      case "In Progress":
        return {
          icon: <AutorenewIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#b57e3f",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      case "Team Closed":
        return {
          icon: <VisibilityOffIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#3fabb5",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      case "Canceled":
        return {
          icon: <CancelIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#b54b3f",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      case "Submitted":
        return {
          icon: <PublishIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "#b53f8c",
            color: "white",
            borderRadius: ".5rem"
          }
        };
      default:
        return {
          icon: <NotInterestedIcon style={{ color: "white" }} />,
          color: {
            backgroundColor: "grey",
            color: "white",
            borderRadius: ".5rem"
          }
        };
    }
  };

  return (
    <Chip
      label={label}
      style={style ? type(style).color : type(style).color}
      clickable={clickable}
      onClick={clickable ? onclick : null}
      icon={type(style).icon}
    />
  );
}

export default Status;
