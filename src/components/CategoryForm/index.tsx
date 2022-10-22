import React from 'react';
import { Grid, TextField, Theme, Button } from '@mui/material';
import { DialogActions, DialogContent } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

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

const CategoryForm = ({
  handleSubmitForm,
  name,
  setName,
  description,
  setDescription,
  requesting,
  handleClose
}) => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.root} onSubmit={handleSubmitForm}>
        <DialogContent>
          <Grid container>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label="Description"
              multiline
              rows={5}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
    </>
  );
};

export default CategoryForm;
