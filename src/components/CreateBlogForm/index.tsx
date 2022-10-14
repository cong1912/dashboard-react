import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Theme,
  Button,
  FormControl,
  FormLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import QuillInput from '../QuillInput';
import BlogManager from 'src/content/applications/Blog';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiBox-root': {
      width: '90%',
      margin: theme.spacing(1)
    }
  },
  btn: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none',
    margin: theme.spacing(0.5)
  }
}));

const CreateBlogForm = ({
  open,
  blog,
  handleClose,
  handleChangeTitle,
  handleChangeSummary,
  handleChangeContent,
  setImage,
  handleCreateBlog,
  requesting
}) => {
  const classes = useStyles();
  const fileInput = useRef();

  const handleChange = (files) => {
    setImage(files);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Create New Blog</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateBlog}>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={handleChangeTitle}
                value={blog.title}
              />
              <TextField
                variant="outlined"
                label="Description"
                name="summary"
                onChange={handleChangeSummary}
                value={blog.summary}
              />
              <Box>
                <QuillInput
                  content={blog.content}
                  handleChangeContent={handleChangeContent}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Thumb</FormLabel>
                <DropzoneArea onChange={handleChange} />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.label}
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

export default CreateBlogForm;
