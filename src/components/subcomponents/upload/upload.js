import React from "react";
import FileUI from "./file-ui";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  uploadprocess,
  addPendingFile,
  cancelFileUpload
} from "../../../store/actions/submissionActions";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export function UploadFiles({
  files,
  setFiles,
  upload,
  uploadFiles,
  addFile,
  cancelUpload
}) {
  const onAddFile = e => {
    const toUpload = {};
    let fileID;
    Array.from(e.target.files).map(file => {
      fileID = Math.floor(Math.random() * 99 + 1);
      fileID = "" + fileID + file.size;
      toUpload[fileID] = file;
      addFile(fileID);
    });
    setFiles({ ...files, ...toUpload });
    e.target.files = null;
  };
  const onDelete = fileID => {
    let delete_obj = files;
    delete delete_obj[fileID];
    cancelUpload(fileID);
    setFiles(delete_obj);
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
            Add Files
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {uploadFiles.map(fileID => {
            return (
              <FileUI
                key={fileID}
                file={files[fileID]}
                index={fileID}
                onDelete={onDelete}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapDispatch = dispatch => ({
  upload: (file, index) => dispatch(uploadprocess(file, index)),
  addFile: fileID => dispatch(addPendingFile(fileID)),
  cancelUpload: fileID => dispatch(cancelFileUpload(fileID))
});

const mapStateToProps = state => ({
  uploadFiles: state.upload.uploadFiles
});

export default connect(mapStateToProps, mapDispatch)(UploadFiles);
