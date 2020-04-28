import React from "react";
import FileUI from "./file-ui";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { uploadWarmup } from "../../../store/actions/submissionActions";
import { connect } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export function UploadFiles({ files, addFile }) {
  const onAddFile = (e) => {
    e.preventDefault();
    let fileId = files.length;
    Array.from(e.target.files).map((file) => {
      addFile(file, fileId);
      fileId++;
      return null;
    });
    console.log(files);
    e.target.files = null;
  };
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      alignContent="center"
      spacing={1}
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
            <PublishIcon style={{ marginRight: "0.5rem" }} />
            Upload File
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {files.map((file, fileID) => {
            return <FileUI key={fileID} file={file} index={fileID} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapDispatch = (dispatch) => ({
  addFile: (file, fileID) => dispatch(uploadWarmup(file, fileID)),
});

const mapStateToProps = (state) => ({
  files: state.upload.uploadFiles,
});

export default connect(mapStateToProps, mapDispatch)(UploadFiles);
