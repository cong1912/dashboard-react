import React, { useContext, useEffect, useState } from 'react';
import { Grid, TextField, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { updateLecture } from 'src/services/LecturesService';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { LECTURE_URL } from 'src/constants/url';
import useSWR, { mutate } from 'swr';
import { getData } from 'src/helpers/apiHandle';
import { ILecture } from 'src/content/applications/Lectures';

import Timymce from '../Timymce';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ql-container': {
      height: 200
    }
  }
}));

const CreateLectureForm = ({
  open,
  setIsOpenUpdateModal,
  id,
  sectionId,
  courseId
}) => {
  console.log('id', id, sectionId);
  const classes = useStyles();
  const [requesting, setRequesting] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [order, setOrder] = useState('');
  const [content, setContent] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //fetch data
  const { data: lecture } = useSWR<ILecture>(
    id ? LECTURE_URL + id : null,
    getData
  );

  console.log(lecture);

  useEffect(() => {
    if (!id || !lecture) {
      return;
    } else {
      setContent(lecture.content);
      setName(lecture.name);
      setPrice(lecture.price);
      setOrder(lecture.order);
    }
  }, [lecture, id]);

  const handleEditLecture = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        content: content,
        sectionId: +sectionId,
        price: +price,
        order: +order
      };

      await updateLecture(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Lecture Success'
      });
      await mutate(LECTURE_URL + `?newsId=${courseId}`);
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>Chỉnh sửa bài học</DialogTitle>
      <form className={classes.root} onSubmit={handleEditLecture}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Order"
                name="order"
                type="number"
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
                value={order}
              />
            </Grid>
            <Grid item xs={12}>
              <Timymce handleChangeContent={setContent} content={content} />
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

export default CreateLectureForm;
