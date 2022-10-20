import { useParams } from 'react-router';
import React, {
  lazy,
  useEffect,
  useState,
  useContext,
  ChangeEvent
} from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import useSWR, { mutate } from 'swr';
import { ICategory } from 'src/components/EditBlogForm';
import { ARTICLE_CATEGORY, COURSE_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { createSection } from 'src/services/SessionService';

const CreateSectionForm = lazy(
  () => import('src/components/CreateSectionForm')
);

const Sections = () => {
  const { id } = useParams() as { id: string };
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  // dialog create
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateSession = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const data = {
        title: title,
        summary: summary,
        newsId: +id
      };

      await createSection(data);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Section Success'
      });
      await mutate(COURSE_URL);
      setOpenDialog(false);
      setSummary('');
      setTitle('');
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Section - Manager</title>
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
            {/* {!courses ? <CircularProgress /> : <CourseTable course={courses} />} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <CreateSectionForm
        open={openDialog}
        handleClose={handleCloseDialog}
        setTitle={setTitle}
        setSummary={setSummary}
        title={title}
        summary={summary}
        requesting={requesting}
        handleCreateSession={handleCreateSession}
      />
    </>
  );
};

export default Sections;
