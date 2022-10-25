import { Grid, TextField, Theme, Button } from '@mui/material';
import { DialogActions, DialogContent } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
  }
}));

const ChangePasswordForm = ({ requesting, handleClose, formik }) => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mật khẩu mới"
                name="newPassword"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nhập lại mật khẩu mới"
                name="confirmNewPassword"
                type="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmNewPassword &&
                  Boolean(formik.errors.confirmNewPassword)
                }
                helperText={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                }
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

export default ChangePasswordForm;
