import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Typography } from "@material-ui/core";

const FileCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          File Name: {props.name}
        </Typography>
        <Typography variant="h6">Size: {props.size}</Typography>
        <Typography variant="h6">Type: {props.type}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<CloudDownloadIcon />}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  );
};

export default FileCard;
