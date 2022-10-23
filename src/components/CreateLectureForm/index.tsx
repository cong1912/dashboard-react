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
import QuillInput from '../QuillInput';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiDialogContent-root': {
      height: 420
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
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Tạo mới bài học</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateLecture}>
        <DialogContent>
          <TextField
            variant="outlined"
            label="name"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
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
          <Box>
            <QuillInput content={content} handleChangeContent={setContent} />
          </Box>
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

export default CreateLectureForm;
