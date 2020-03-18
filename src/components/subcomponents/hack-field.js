import React from "react";
import { 
    FormControl,
    OutlinedInput,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  } else {
    return (
        <Typography variant={props.variant}>{props.displayText}</Typography>
    );
  }
}

export default HackField;
