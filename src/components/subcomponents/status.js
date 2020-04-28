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
          backgroundColor: "#41b53f"
        };
      case "Looking for members":
        return {
          backgroundColor: "#a73fb5"
        };
      case "In Progress":
        return {
          backgroundColor: "#b57e3f"
        };
      case "Team Closed":
        return {
          backgroundColor: "#3fabb5"
        };
      case "Canceled":
        return {
          backgroundColor: "#b54b3f"
        };
      case "Submitted":
        return {
          backgroundColor: "#b53f8c"
        };
      default:
        return {
          backgroundColor: "grey"
        };
    }
  };

  const chipIcon = label => {
    switch (label) {
      case "New Hack":
        return <NewReleasesIcon style={{ color: "white" }} />;
      case "Looking for members":
        return <VisibilityIcon style={{ color: "white" }} />;
      case "In Progress":
        return <AutorenewIcon style={{ color: "white" }} />;
      case "Team Closed":
        return <VisibilityOffIcon style={{ color: "white" }} />;
      case "Canceled":
        return <CancelIcon style={{ color: "white" }} />;
      case "Submitted":
        return <PublishIcon style={{ color: "white" }} />;
      default:
        return <NotInterestedIcon style={{ color: "white" }} />;
    }
  };

  return (
    <Chip
      label={label}
      style={{...type(style), color: "white", borderRadius: ".5rem", marginRight: "0.5rem"}}
      clickable={clickable}
      onClick={clickable ? onclick : null}
      icon={chipIcon(label)}
    />
  );
}

export default Status;
