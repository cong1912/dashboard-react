import { useParams } from 'react-router';
import React, { lazy, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import useSWR, { mutate } from 'swr';
import { QUIZ_ANSWER_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import QuestionTable from './QuizAnswerTable';
import { createAnswer } from 'src/services/AnswerService';

export interface IAnswer {
  id: number;
  content: string;
  correct: boolean;
}

export interface IAnswers {
  results: [IAnswer];
}

const CreateQuizAnswerForm = lazy(
  () => import('src/components/CreateQuizAnswerForm')
);

const QuizAnswer = () => {
  const { id } = useParams() as { id: string };
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [content, setContent] = useState('');
  const [correct, setCorrect] = useState<Boolean>();

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  // fetch data
  const { data: questions } = useSWR<IAnswers>(
    id ? QUIZ_ANSWER_URL + `?questionId=${id}` : null,
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
      const data = {
        content: content,
        correct: correct,
        questionId: +id
      };

      await createAnswer(data);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Answer Success'
      });
      await mutate(QUIZ_ANSWER_URL + `?questionId=${id}`);
      setOpenDialog(false);
      setContent('');
      setCorrect(false);
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
        <title>Quiz Answers - Manager</title>
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

      <CreateQuizAnswerForm
        open={openDialog}
        handleClose={handleCloseDialog}
        requesting={requesting}
        handleCreateQuestion={handleCreateQuestion}
        setContent={setContent}
        content={content}
        correct={correct}
        setCorrect={setCorrect}
      />
    </>
  );
};

export default QuizAnswer;
