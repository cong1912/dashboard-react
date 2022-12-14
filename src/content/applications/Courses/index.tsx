import React, { lazy, useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import useSWR, { mutate } from 'swr';
import { ICategory } from 'src/components/EditArticleForm';
import {
  ARTICLE_CATEGORY,
  CATEGORIES_URL,
  COURSE_URL
} from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { createCourse } from 'src/services/CourseService';
import CourseTable from './CourseTable';

const CreateCourseForm = lazy(() => import('src/components/CreateCourseForm'));

export interface ICourses {
  pageSize: number;
  results: ICourse[];
}
export interface ICourse {
  id: number;
  title: string;
  creatorId: number;
  image: string;
  description: string;
  categoryId: number;
}
export interface ICategories {
  results: ICategory[];
}

const Courses = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [description, setDescription] = useState('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState<ICategory>();
  const [title, setTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState<ICategory>(null);
  const [page, setPage] = useState(0);

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //FETCH DATA
  const { data: courses } = useSWR<ICourses>(
    filterCategory
      ? COURSE_URL + `?categoryId=${filterCategory.id}`
      : COURSE_URL + `?page=${page}`,
    getData
  );
  const { data: categories } = useSWR<ICategories>(CATEGORIES_URL, getData);

  useEffect(() => {
    if (!categories) return;

    setCategory(categories.results[0]);
  }, [categories]);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCourse = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.set('file', image[0]);
      formData.set('description', description);
      formData.set('title', title);
      formData.set('categoryId', category.id && ('1' as unknown as string));

      const res = await createCourse(formData);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'T???o kh??a h???c th??nh c??ng'
      });
      await mutate(COURSE_URL + `?page=${page}`);
      setOpenDialog(false);
      setDescription('');
      setTitle('');
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!courses) return <></>;
  if (!categories) return <></>;
  return (
    <>
      <Helmet>
        <title>Course - Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader handleClickOpenDialog={handleClickOpenDialog} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {!courses ? (
              <CircularProgress />
            ) : (
              <CourseTable
                page={page}
                setPage={setPage}
                course={courses}
                categories={categories}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {!categories ? (
        <CircularProgress />
      ) : (
        <CreateCourseForm
          open={openDialog}
          handleClose={handleCloseDialog}
          setTitle={setTitle}
          title={title}
          setDescription={setDescription}
          description={description}
          setImage={setImage}
          requesting={requesting}
          handleCreateCourse={handleCreateCourse}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      )}
    </>
  );
};

export default Courses;
