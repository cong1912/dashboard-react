import React from 'react';
import { TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
      height: 250
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

const CreateQuestionForm = ({
  open,
  handleClose,
  handleCreateQuestion,
  requesting,
  setContent,
  content,
  title,
  setTitle
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Tạo mới câu hỏi</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateQuestion}>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Title"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <TextField
            label="Content"
            multiline
            rows={5}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
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

export default CreateQuestionForm;
