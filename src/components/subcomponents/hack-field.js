import React from "react";
import { FormControl, OutlinedInput, Typography } from "@material-ui/core";

export function HackField(props) {
  if (props.edit) {
    return (
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          onChange={props.onChange}
          placeholder="Description"
          name={props.name}
          multiline
          defaultValue={props.displayText}
        ></OutlinedInput>
      </FormControl>
    );
  }
  return <Typography variant={props.variant}>{props.displayText}</Typography>;
}

export default HackField;
