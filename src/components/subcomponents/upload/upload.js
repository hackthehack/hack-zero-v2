import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
  LinearProgress
} from "@material-ui/core";
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
    minHeight: "10rem",
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
  },
  loading: {
    width: " 100%",
    height: ".5rem"
  }
}));

export function UploadFiles(props) {
  const [files, setFiles] = useState([]);

  const onAddFile = e => {
    const toUpload = [];
    Array.from(e.target.files).forEach(file => {
      toUpload.push({ data: file, upload: "PENDING" });
    });
    setFiles([...files, ...toUpload]);
    e.target.files = null
  };
  const onDelete = (file) => {
    let delete_Array = files
    delete_Array.splice(files.indexOf(file),1)
    setFiles([...delete_Array])
  };

  const handelSubmit = e => {
    e.preventDefault()
    files.map((file, index) => {
      if (file.upload !== "UPLOADED") {
        file.upload = "UPLOADING";
        setFiles([...files]);
        const fileUpload = Axios.post(
          UrlJoin(process.env.REACT_APP_API_URL, `upload`),
          { fileName: file.data.name }
        );
        fileUpload.then(res => {
          const url = res.data.fileUploadURL;
          Axios({
            method: "PUT",
            url: url,
            data: file.data,
            headers: { "Content-Type": "multipart/form-data" }
          })
            .then(res => {
              file.upload = "UPLOADED";
              setFiles([...files]);
            })
            .catch(error => {
              console.log(error);
              file.upload = "FAILED";
              setFiles([...files]);
            });
        }).catch(error => {
          console.log(error);
          file.upload = "FAILED";
          setFiles([...files]);
        });
      }
    });
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
          onChange={onAddFile}
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
            return (
              <Grid item key={index}>
                <Paper className={classes.attachment}>
                  <IconButton
                    className={classes.attachDel}
                    color="secondary"
                    component="span"
                    size="small"
                    onClick={e => {
                      e.preventDefault()
                      onDelete(file)
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  <AttachFileIcon
                    className={classes.attachIco}
                    fontSize="large"
                    disabled
                  />
                  <Typography variant="body1" className={classes.overflow}>
                    {file.data.name}
                  </Typography>
                  <Typography variant="body1">
                    {(file.data.size / 1000000).toFixed(2) + "MB"}
                  </Typography>
                  {(() => {
                    switch (file.upload) {
                      case "UPLOADING":
                        return <LinearProgress className={classes.loading} />;
                      case "UPLOADED":
                        return (
                          <LinearProgress
                            variant="determinate"
                            value={100}
                            className={classes.loading}
                          />
                        );
                      case "FAILED":
                        return (
                          <Typography variant="body2" color="secondary">
                            Upload Failed
                          </Typography>
                        );
                      default:
                        return null;
                    }
                  })()}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={4} style={{ marginTop: "1rem" }}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            onClick={handelSubmit}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UploadFiles;
