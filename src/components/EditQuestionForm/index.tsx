import React, { useEffect, useState, useContext } from 'react';
import {
  TextField,
  Theme,
  Button,
  FormLabel,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
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
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
  }
}));

const CreateQuestionForm = ({ open, setIsOpenUpdateModal, id, newsId }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

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
      const newImage =
        questions.imgUrl == null
          ? null
          : process.env.REACT_APP_API_BACK_END +
            questions.imgUrl.replace('public/', '');
      setTitle(questions.title);
      setContent(questions.content);
      setImageUrl(newImage);
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
      const formData = new FormData();
      formData.set('content', content);
      formData.set('title', title);
      formData.set('newsId', +newsId as unknown as string);

      if (image[0]) {
        formData.set('file', image[0]);
      }

      await updateQuestion(formData, id);
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
  const handleChange = (files) => {
    setImage(files);
  };

  if (!questions) return <CircularProgress />;
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Chỉnh sửa câu hỏi</DialogTitle>
      <form className={classes.root} onSubmit={handleEditQuestion}>
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Thumb</FormLabel>
              <DropzoneArea
                initialFiles={[imageUrl]}
                onChange={handleChange}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                maxFileSize={5000000}
                filesLimit={1}
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

export default CreateQuestionForm;
