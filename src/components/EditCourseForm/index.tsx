import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  TextField,
  Theme,
  Button,
  FormControl,
  FormLabel,
  Autocomplete
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { ICategory } from '../EditArticleForm';
import { getData } from 'src/helpers/apiHandle';
import { CATEGORIES_URL, COURSE_URL } from 'src/constants/url';
import useSWR, { mutate } from 'swr';
import { ICategories, ICourse } from 'src/content/applications/Courses';
import { updateCourse } from 'src/services/CourseService';
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

const EditCourseForm = ({ open, id, setIsOpenUpdateModal }) => {
  const classes = useStyles();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [categoriesUpdate, setCategoriesUpdate] = useState<ICategory>();
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  const { data: course } = useSWR<ICourse>(
    id ? COURSE_URL + id : null,
    getData
  );
  const { data: articleCategory } = useSWR<ICategories>(
    CATEGORIES_URL,
    getData
  );

  useEffect(() => {
    if (!id || !course) {
      return;
    } else {
      setTitle(course.title);
      setDescription(course.description);
      if (!course) {
        return;
      } else {
        setImageUrl(
          `${
            process.env.REACT_APP_API_BACK_END +
            course.image.slice(7, course.image.length)
          }`
        );
        setCategories(articleCategory.results);
        setCategoriesUpdate(
          articleCategory.results[
            articleCategory.results.findIndex(
              (element) => element.id == course.categoryId
            )
          ]
        );
      }
    }
  }, [articleCategory, course, id]);

  const handleUpdateCourse = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.set('title', title);
      formData.set('description', description);
      if (categoriesUpdate)
        formData.set('categoryId', categoriesUpdate.id as unknown as string);
      if (image[0]) {
        formData.set('file', image[0]);
      }

      await updateCourse(formData, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Edit Course Success'
      });
      await mutate(COURSE_URL);
      await mutate(COURSE_URL + id);
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
  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };

  if (!course) return <div></div>;
  if (!articleCategory) return <div></div>;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Chỉnh sửa khóa học</DialogTitle>
      <form className={classes.root} onSubmit={handleUpdateCourse}>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categories}
                onChange={(event, value) => setCategoriesUpdate(value)}
                value={categoriesUpdate}
                getOptionLabel={(option: { name: string }) => option.name}
                renderInput={(params) => {
                  return <TextField {...params} label="Category" />;
                }}
              />
              <TextField
                label="Content"
                multiline
                rows={5}
                name="content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Thumb</FormLabel>
                <DropzoneArea
                  initialFiles={[imageUrl]}
                  onChange={handleChange}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  maxFileSize={5000000}
                  filesLimit={1}
                />
              </FormControl>
            </Grid>
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
    </Dialog>
  );
};

export default EditCourseForm;
