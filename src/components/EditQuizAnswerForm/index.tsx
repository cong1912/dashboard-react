import React, { useState, useContext, useEffect } from 'react';
import { TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { updateAnswer } from 'src/services/AnswerService';
import { Grid, Container, CircularProgress } from '@mui/material';
//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import useSWR, { mutate } from 'swr';
import { QUIZ_ANSWER_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import { IAnswer } from 'src/content/applications/QuizAnswer';

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

const EditQuizAnswerForm = ({ open, setIsOpenUpdateModal, id, questionId }) => {
  const classes = useStyles();
  const [requesting, setRequesting] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [content, setContent] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //fetch data
  const { data: answer } = useSWR<IAnswer>(
    id ? QUIZ_ANSWER_URL + id : null,
    getData
  );

  useEffect(() => {
    if (!id || !answer) {
      return;
    } else {
      setContent(answer.content);
      setCorrect(answer.correct);
    }
  }, [answer, id]);

  const handleEditAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        content: content,
        correct: correct,
        questionId: +questionId
      };

      await updateAnswer(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Edit Answer Success'
      });
      await mutate(QUIZ_ANSWER_URL + `?questionId=${questionId}`);
      setIsOpenUpdateModal(false);
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

  if (!answer) return <CircularProgress />;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Edit New Answer</DialogTitle>
      <form className={classes.root} onSubmit={handleEditAnswer}>
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

export default EditQuizAnswerForm;
