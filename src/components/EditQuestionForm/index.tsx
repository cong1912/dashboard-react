import React, { useEffect, useState, useContext } from 'react';
import { TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { QUESTION_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import useSWR, { mutate } from 'swr';
import { updateQuestion } from 'src/services/QuestionService';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { IQuestion } from 'src/content/applications/Questions';

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

const CreateQuestionForm = ({ open, setIsOpenUpdateModal, id, newsId }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [requesting, setRequesting] = useState(false);

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  // fetch data
  const { data: questions } = useSWR<IQuestion>(
    id ? QUESTION_URL + id : null,
    getData
  );

  useEffect(() => {
    if (!id || !questions) {
      return;
    } else {
      setTitle(questions.title);
      setContent(questions.content);
    }
  }, [questions, id]);

  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };
  const handleEditQuestion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const data = {
        title: title,
        content: content,
        newsId: +newsId
      };

      await updateQuestion(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Edit Question Success'
      });
      await mutate(QUESTION_URL + `?newsId=${newsId}`);
      setIsOpenUpdateModal(false);
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Edit Question</DialogTitle>
      <form className={classes.root} onSubmit={handleEditQuestion}>
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
