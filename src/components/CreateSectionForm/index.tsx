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
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
  }
}));

const CreateSessionForm = ({
  open,
  handleClose,
  handleCreateSession,
  requesting,
  setTitle,
  setSummary,
  summary,
  title
}) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Tạo section mới</DialogTitle>
      <form className={classes.root} onSubmit={handleCreateSession}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                multiline
                rows={5}
                name="content"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
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

export default CreateSessionForm;
