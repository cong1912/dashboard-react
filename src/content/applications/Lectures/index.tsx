import { useParams } from 'react-router';
import React, { lazy, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from 'src/components/Footer';
import useSWR, { useSWRConfig } from 'swr';
import { LECTURE_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { createLecture } from 'src/services/LecturesService';
import LecturesTable from './LecturesTable';

const CreateLectureForm = lazy(
  () => import('src/components/CreateLectureForm')
);

export interface ILecture {
  content: string;
  name: string;
  price: string;
  order: string;
}

export interface ILectures {
  currentPage: number;
  pageSize: number;
  total: number;
  results: ILecture[];
  totalPages: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ck-content': {
      height: 250
    }
  }
}));

const Lectures = () => {
  const { mutate } = useSWRConfig();
  const { sectionId } = useParams() as { sectionId: string };
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);
  const [page, setPage] = useState(0);

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  // fetch data
  const { data: lectures } = useSWR<ILectures>(
    sectionId ? LECTURE_URL + `?newsId=${sectionId}` : null,
    getData
  );
  console.log();

  // dialog create
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateLecture = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        content: content,
        newsId: +sectionId,
        price: +price,
        order: +order
      };

      await createLecture(data);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Lecture Success'
      });
      await mutate(LECTURE_URL + `?newsId=${sectionId}`);
      setOpenDialog(false);
      setContent('');
      setName('');
      setPrice(0);
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!lectures) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>Lectures - Manager</title>
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
            <LecturesTable
              lectures={lectures}
              // page={page}
              // setPage={setPage}
              data={lectures}
              sectionId={sectionId}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <CreateLectureForm
        open={openDialog}
        setContent={setContent}
        setPrice={setPrice}
        setName={setName}
        price={price}
        order={order}
        setOrder={setOrder}
        name={name}
        content={content}
        requesting={requesting}
        handleCreateLecture={handleCreateLecture}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default Lectures;
