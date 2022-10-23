import React from 'react';
import { Grid, TextField, Theme, Button } from '@mui/material';
import { DialogActions, DialogContent } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={5}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
    </>
  );
};

export default CategoryForm;
