import React, { useContext, useEffect, useState } from 'react';
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
import { updateLecture } from 'src/services/LecturesService';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { LECTURE_URL } from 'src/constants/url';
import useSWR, { mutate } from 'swr';
import { getData } from 'src/helpers/apiHandle';
import { Ilecture } from 'src/content/applications/Lectures';

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

const CreateLectureForm = ({ open, setIsOpenUpdateModal, id }) => {
  const classes = useStyles();
  const [requesting, setRequesting] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //fetch data
  const { data: lecture } = useSWR<Ilecture>(
    id ? LECTURE_URL + id : null,
    getData
  );

  useEffect(() => {
    if (!id || !lecture) {
      return;
    } else {
      setContent(lecture.content);
      setName(lecture.name);
      setPrice(lecture.price);
    }
  }, [lecture, id]);

  const handleEditLecture = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        content: content,
        sectionId: +id,
        price: +price
      };

      await updateLecture(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Lecture Success'
      });
      await mutate(LECTURE_URL);
      setIsOpenUpdateModal(false);
      setContent('');
      setName('');
      setPrice('');
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Create New Session</DialogTitle>
      <form className={classes.root} onSubmit={handleEditLecture}>
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
