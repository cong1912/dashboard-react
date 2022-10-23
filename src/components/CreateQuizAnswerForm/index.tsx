import React from 'react';
import { TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from '@material-ui/core';
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={correct} />}
                onChange={(e) => {
                  setCorrect(!correct);
                }}
                labelPlacement="start"
                label="This is the correct answer:"
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

export default CreateQuizAnswerForm;
