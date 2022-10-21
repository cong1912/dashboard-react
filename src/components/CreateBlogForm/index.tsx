import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  TextField,
  Theme,
  Button,
  FormControl,
  FormLabel,
  Autocomplete
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiDialogContent-root': {
      height: 400
    },
    '& .MuiBox-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .quill': {
      height: 120
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
  requesting,
  categories,
  category,
  setCategory
}) => {
  const classes = useStyles();

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
                  content=""
                  handleChangeContent={handleChangeContent}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories.results}
                  onChange={(event, value) => setCategory(value)}
                  value={category}
                  getOptionLabel={(option: { name: string }) => option.name}
                  renderInput={(params) => {
                    return <TextField {...params} label="Category" />;
                  }}
                />
                <FormLabel>Thumb</FormLabel>
                <DropzoneArea
                  onChange={handleChange}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  maxFileSize={5000000}
                  filesLimit={1}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
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
