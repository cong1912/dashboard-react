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
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    },
    '& .MuiBox-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5)
  },
  btn: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none',
    margin: theme.spacing(0.5)
  }
}));

const CreateBlogForm = ({ open, handleClose }) => {
  const classes = useStyles();
  const { quill, quillRef } = useQuill();
  const fileInput = useRef();
  const [image, setImage] = useState([]);
  const [value, setValue] = useState('');
  console.log(fileInput);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  const handleChange = (files) => {
    setImage(files);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Create New Blog</DialogTitle>
      <DialogContent>
        <Paper className={classes.pageContent}>
          <form className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
                <TextField variant="outlined" label="Title" value="" />
                <TextField variant="outlined" label="Description" value="" />
                <Box>
                  <div ref={quillRef} style={{ height: 110 }} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel>Thumb</FormLabel>
                  <DropzoneArea onChange={handleChange} />
                </FormControl>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.label}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBlogForm;
