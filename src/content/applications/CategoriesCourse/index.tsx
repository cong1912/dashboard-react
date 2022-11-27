import React, { lazy, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress, Dialog } from '@mui/material';
import Footer from 'src/components/Footer';
import useSWR, { mutate } from 'swr';
import { CATEGORIES_URL } from 'src/constants/url';
import { getData } from 'src/helpers/apiHandle';
import { DialogTitle } from '@material-ui/core';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { createCategory } from 'src/services/CategoryService';
import CategoryTable from './CategoryTable';

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ICategories {
  sizePage: number;
  results: ICategory[];
}

const CategoryForm = lazy(() => import('src/components/CategoryForm'));

const Categories = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;
  const [page, setPage] = useState(0);
  // fetch data
  const { data: categories } = useSWR<ICategories>(
    CATEGORIES_URL + `?page=${page}`,
    getData
  );
  // dialog create
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCategory = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        description: description
      };

      await createCategory(data);

      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Answer Success'
      });

      await mutate(CATEGORIES_URL + `?page=${page}`);
      setOpenDialog(false);
      setName('');
      setDescription('');
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!categories) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>Categories - Manager</title>
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
            {!categories ? (
              <CircularProgress />
            ) : (
              <CategoryTable
                page={page}
                setPage={setPage}
                categories={categories}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <DialogTitle>Tạo danh mục mới</DialogTitle>
        <CategoryForm
          handleSubmitForm={handleCreateCategory}
          handleClose={handleCloseDialog}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          requesting={requesting}
        />
      </Dialog>
    </>
  );
};

export default Categories;
