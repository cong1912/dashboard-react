import React from 'react';
import { TextField, Theme, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiDialogContent-root': {
      height: 200
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

const CreateQuizAnswerForm = ({
  open,
  handleClose,
  handleCreateQuestion,
  requesting,
  setContent,
  content,
  correct,
  setCorrect
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Tạo câu trả lời mới</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateQuestion}>
        <DialogContent>
          <TextField
            variant="outlined"
            label="content"
            multiline
            name="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />
          <FormControlLabel
            control={<Checkbox checked={correct} />}
            onChange={(e) => {
              setCorrect(!correct);
            }}
            label="This is the correct answer:"
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

export default CreateQuizAnswerForm;
