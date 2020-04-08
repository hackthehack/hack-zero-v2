import React, { useState } from "react";
import { Grid, Typography, Button, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Axios from "axios";
import UrlJoin from "url-join";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  attachment: {
    position: "relative",
    height: "10rem",
    width: "9rem",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: "0.5rem"
  },
  attachDel: {
    position: "absolute",
    right: "-0.5rem",
    top: "-0.5rem"
  },
  attachIco: {
    height: "5rem"
  },
  overflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "inherit",
    padding: "0.5rem"
  }
}));

export function UploadFiles(props) {
  // console.log(props);
  const [files, setFiles] = useState([]);

  const onUpload = e => {
    console.log(e.target.files)
    setFiles([...files, ...e.target.files]);
  };

  const onDelete = () => {};

  const handelSubmit = () => {
    const response = Axios.post(UrlJoin(process.env.REACT_APP_API_URL, `upload`),{ fileName: files[0].name })
    console.log(response)
  };
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
      className={classes.root}
      style={{ width: "inherit", margin: "2rem" }}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Attach Files</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">[Upload instructions Here]</Typography>
      </Grid>
      <Grid item xs={12}>
        <input
          className={classes.input}
          type="file"
          id="upload-field"
          name="uploadFiles"
          multiple
          onChange={onUpload}
        />
        <label htmlFor="upload-field">
          <Button variant="outlined" color="primary" component="span">
            Add Files
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {files.map((file, index) => {
            console.log(index + "  " + file);
            return (
              <Grid item key={index}>
                <Paper className={classes.attachment}>
                  <IconButton
                    className={classes.attachDel}
                    color="secondary"
                    component="span"
                    size="small"
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  <AttachFileIcon
                    className={classes.attachIco}
                    fontSize="large"
                    disabled
                  />
                  <Typography variant="body1" className={classes.overflow}>
                    {file.name}
                  </Typography>
                  <Typography variant="body1">
                    {(file.size / 1000000).toFixed(2) + "MB"}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={4} style={{ marginTop: "1rem" }}>
          <Button variant="outlined" color="primary" component="span" onClick={handelSubmit}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UploadFiles;
