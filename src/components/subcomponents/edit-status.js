import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Status from "./status";

const statusLabel = [
  "New Hack",
  "Looking for members",
  "In Progress",
  "Team Closed",
  "Canceled",
  "Submitted"
];

export function EditHackStatus({ status, handleUpdate }) {

  const [enabled, setEnabled] = useState("");

  useEffect(() => {
    if (status) {
      setEnabled(status);
    }
  }, [status, setEnabled]);

  const update = statusValue => {
    setEnabled(statusValue);
    handleUpdate(statusValue);
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
    >
      <Grid item xs={10}>
        {statusLabel.map((element, index) => {
          return (
            <Status
              key={index}
              label={element}
              style={enabled === element ? enabled : null}
              clickable={true}
              onclick={e => {
                e.preventDefault();
                update(element);
              }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default EditHackStatus;
