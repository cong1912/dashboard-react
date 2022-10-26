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
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

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

const API_URL = 'http://139.59.104.129:8000/api/v1/media';
const UPLOAD_ENDPOINT = 'exact_url';

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
  const token = JSON.parse(localStorage.getItem('token') || 'null');

  const handleChange = (files) => {
    setImage(files);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file) => {
            body.append('file', file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            await axios({
              method: 'post',
              url: 'http://139.59.104.129:8000/api/v1/media/exact_url',
              data: body,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            })
              .then((res) => res)
              .then((res) => {
                console.log(res, 'res');
                resolve({
                  default: `${res.data.url.replace('/public', '')}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      console.log(uploadAdapter(loader));
      return uploadAdapter(loader);
    };
  }

  if (!categories) return <CircularProgress />;
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
              {/* <QuillInput
                content=""
                handleChangeContent={handleChangeContent}
              /> */}

              <CKEditor
                config={{
                  extraPlugins: [uploadPlugin]
                }}
                editor={ClassicEditor}
                onReady={(editor) => {}}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
                onChange={(event, editor) => {
                  handleChangeContent(editor.getData());
                }}
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
