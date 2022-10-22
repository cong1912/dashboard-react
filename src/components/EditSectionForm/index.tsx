import React, { useState, useContext, useEffect } from 'react';
import { TextField, Theme, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import QuillInput from '../QuillInput';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { updateSection } from 'src/services/SessionService';
import useSWR, { mutate } from 'swr';
import { SECTION_URL } from 'src/constants/url';
import { ISection } from 'src/content/applications/Sections';
import { getData } from 'src/helpers/apiHandle';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiDialogContent-root': {
      height: 400
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

const EditSessionForm = ({ open, setIsOpenUpdateModal, id, newId }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [requesting, setRequesting] = useState(false);

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //fetch data
  const { data: section } = useSWR<ISection>(
    id ? SECTION_URL + id : null,
    getData
  );
  useEffect(() => {
    if (!id || !section) {
      return;
    } else {
      setTitle(section.title);
      setSummary(section.summary);
    }
  }, [section, id]);

  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };

  const handleEditSection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        title: title,
        summary: summary,
        newsId: +newId
      };

      await updateSection(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Section Success'
      });
      await mutate(SECTION_URL);
      await mutate(SECTION_URL + `?newsId=${newId}`);
      setIsOpenUpdateModal(false);
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!section) return <CircularProgress />;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Create New Session</DialogTitle>
      <form className={classes.root} onSubmit={handleEditSection}>
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
          <Box>
            <QuillInput content={summary} handleChangeContent={setSummary} />
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

export default EditSessionForm;
