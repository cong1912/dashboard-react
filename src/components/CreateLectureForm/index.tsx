import React from 'react';
import { Grid, TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadPlugin } from 'src/helpers/uploadAdapter';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ck-content': {
      height: 200
    }
  }
}));

const CreateLectureForm = ({
  open,
  handleClose,
  handleCreateLecture,
  requesting,
  setName,
  setContent,
  content,
  name,
  price,
  setPrice
  order,
  setOrder
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Tạo mới bài học</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateLecture}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Price"
                name="price"
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Order"
                name="order"
                type="number"
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
                value={order}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <QuillInput content={content} handleChangeContent={setContent} /> */}
              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin]
                }}
                editor={ClassicEditor}
                onReady={(editor) => {}}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
                onChange={(event, editor) => {
                  setContent(editor.getData());
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            size="large"
            type="submit"
            disabled={requesting}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateLectureForm;
