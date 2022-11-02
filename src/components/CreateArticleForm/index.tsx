import React, { useRef } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadPlugin } from 'src/helpers/uploadAdapter';
import { Editor, IAllProps } from '@tinymce/tinymce-react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ck-content': {
      height: 250
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
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const onChange = (e) => {
    console.log(e.target.getContent());
  };
  const classes = useStyles();

  const handleChange = (files) => {
    setImage(files);
  };

  if (!categories) return <CircularProgress />;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
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
              <>
                {/* <Editor
                  apiKey="4wvwhb18asy172qnsxv6g879f5er5mcoowyg3gygvys2lm9x"
                  initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    plugins:
                      'powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker help formatpainter permanentpen charmap linkchecker emoticons advtable export print autosave',
                    toolbar:
                      'undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat',
                    toolbar_sticky: true,
                    icons: 'thin',
                    skin: 'material-classic',
                    relative_urls: true,
                    document_base_url: 'http://www.example.com/path1/',
                    a11y_advanced_options: true
                  }}
                  onChange={onChange}
                />
              </> */}
                {/* @ts-ignore*/}
                <Editor
                  apiKey="4wvwhb18asy172qnsxv6g879f5er5mcoowyg3gygvys2lm9x"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    // menubar: false,
                    plugins:
                      'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onChange={onChange}
                />
              </>
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
