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
import { Box } from '@mui/system';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import QuillInput from '../QuillInput';

import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { ICategory } from '../EditBlogForm';
import { getData } from 'src/helpers/apiHandle';
import { ARTICLE_CATEGORY, COURSE_URL } from 'src/constants/url';
import useSWR from 'swr';
import {
  ICategories,
  ICourse,
  ICourses
} from 'src/content/applications/Courses';
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
      height: 120
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
  const [indexCategory, setIndexCategory] = useState<number>();

  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  const { data: course } = useSWR<ICourse>(
    id ? COURSE_URL + id : null,
    getData
  );
  console.log(course);
  const { data: articleCategory } = useSWR<ICategories>(
    ARTICLE_CATEGORY,
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
        setIndexCategory(
          articleCategory.results.findIndex(
            (element) => element.id == course.categoryId
          )
        );
      }
    }
  }, [articleCategory, course, id]);

  const handleUpdateCourse = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    console.log(1);
  };

  const handleChange = (files) => {
    setImage(files);
  };
  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };

  if (!course && !articleCategory) return <div></div>;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
      <DialogTitle>Update Course</DialogTitle>
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

              <Box>
                <QuillInput
                  content={description}
                  handleChangeContent={setDescription}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categories}
                  onChange={(event, value) => setCategoriesUpdate(value)}
                  value={categories[indexCategory]}
                  getOptionLabel={(option: { name: string }) => option.name}
                  renderInput={(params) => {
                    return <TextField {...params} label="Category" />;
                  }}
                />
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