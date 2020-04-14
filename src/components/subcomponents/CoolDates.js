import React from "react";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
const CoolDates = ({ status, time }) => {
  //  console.log(Icon);
  return (
    <div style={{ position: "relative" }}>
      {status === "startDate" ? (
        <EventAvailableIcon color="primary" />
      ) : (
        <EventBusyIcon color="error" />
      )}

      <span
        style={{ marginLeft: "1rem", position: "absolute", bottom: "0.35rem" }}
      >
        {time ? time.substring(0, 10).replace(/-/g, "/") : null}
      </span>
    </div>
  );
};

export default CoolDates;
