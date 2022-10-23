import React from 'react';
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
      height: 180
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

const CreateCourseForm = ({
  open,
  handleClose,
  handleCreateCourse,
  description,
  setDescription,
  requesting,
  setImage,
  categories,
  category,
  setCategory,
  setTitle,
  title
}) => {
  const classes = useStyles();

  const handleChange = (files) => {
    setImage(files);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Tạo mới khóa học</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateCourse}>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
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
              <TextField
                label="Content"
                multiline
                rows={5}
                name="content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
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

export default CreateCourseForm;
