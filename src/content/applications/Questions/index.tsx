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
import { QUESTION_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { createQuestion } from 'src/services/QuestionService';
import QuestionTable from './QuestionTable';

export interface IQuestion {
  id: number;
  content: string;
  title: string;
  imgUrl: string;
}

export interface IQuestions {
  results: [IQuestion];
}

const CreateQuestionForm = lazy(
  () => import('src/components/CreateQuestionForm')
);

const Question = () => {
  const { id } = useParams() as { id: string };
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  // fetch data
  const { data: questions } = useSWR<IQuestions>(
    id ? QUESTION_URL + `?newsId=${id}` : null,
    getData
  );
  // dialog create
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateQuestion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title);
      formData.append('newsId', +id as unknown as string);
      if (image[0]) {
        formData.append('file', image[0]);
      }

      await createQuestion(formData);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Question Success'
      });
      await mutate(QUESTION_URL + `?newsId=${id}`);
      setOpenDialog(false);
      setContent('');
      setTitle('');
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!questions) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>Question - Manager</title>
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
            {!questions ? (
              <CircularProgress />
            ) : (
              <QuestionTable questions={questions} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <CreateQuestionForm
        open={openDialog}
        handleClose={handleCloseDialog}
        requesting={requesting}
        handleCreateQuestion={handleCreateQuestion}
        setContent={setContent}
        content={content}
        title={title}
        setTitle={setTitle}
        setImage={setImage}
      />
    </>
  );
};

export default Question;
