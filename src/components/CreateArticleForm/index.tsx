import React from 'react';
import {
  Grid,
  TextField,
  Theme,
  Button,
  FormLabel,
  Autocomplete
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel
} from '@material-ui/core';
import QuillInput from '../QuillInput';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ql-container': {
      height: 290
    }
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
  setCategory,
  highlight,
  setHighlight
}) => {
  const classes = useStyles();

  const handleChange = (files) => {
    setImage(files);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Tạo tin tức mới</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateBlog}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={handleChangeTitle}
                value={blog.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Description"
                name="summary"
                onChange={handleChangeSummary}
                value={blog.summary}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <QuillInput
                content=""
                handleChangeContent={handleChangeContent}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Thumb</FormLabel>
              <DropzoneArea
                onChange={handleChange}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                maxFileSize={5000000}
                filesLimit={1}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={highlight} />}
                onChange={(e) => {
                  setHighlight(!highlight);
                }}
                labelPlacement="start"
                label="Tin nổi bật:"
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

export default CreateBlogForm;
