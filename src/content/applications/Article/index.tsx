import { ChangeEvent, lazy, useContext, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import BlogTable from './BlogTable';

import { getData } from 'src/helpers/apiHandle';
import { ARTICLE_CATEGORY, NEWS_URL } from 'src/constants/url';
import { createBlog } from 'src/services/ArticleService';

import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ICategory } from 'src/components/EditArticleForm';
import { ICategories } from '../Courses';

const CreateBlogForm = lazy(() => import('src/components/CreateArticleForm'));

interface IBlog {
  id: number;
  title: string;
  summary: string;
  avatar: string;
  highlight: boolean;
}
export interface IBlogs {
  sizePage: number;
  results: IBlog[];
}

function BlogManager() {
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState<ICategory>(null);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState('');
  const [blog, setBlog] = useState({
    title: '',
    summary: ''
  });
  const [requesting, setRequesting] = useState<boolean>(false);
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;
  const [highlight, setHighlight] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<ICategory>(null);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const [page, setPage] = useState(0);

  console.log('content', content);

  const { data: articles } = useSWR<IBlogs>(
    filterCategory
      ? NEWS_URL + `?categoryId=${filterCategory.id}`
      : NEWS_URL + `?page=${page}`,
    getData
  );
  const { data: categories } = useSWR<ICategories>(ARTICLE_CATEGORY, getData);

  useEffect(() => {
    if (!categories) return;

    setCategory(categories?.results[0]);
  }, [categories]);

  //dialog create
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCreateBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.set('file', image[0]);
      formData.set('content', content);
      formData.set('title', blog.title);
      formData.set('summary', blog.summary);
      formData.set('highlight', highlight as unknown as string);
      formData.set('categoryId', category.id as unknown as string);

      await createBlog(formData);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Article Success'
      });
      await mutate(NEWS_URL + `?page=${page}`);
      setOpenDialog(false);
      setContent('');
      setBlog({
        title: '',
        summary: ''
      });
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  if (!articles) return <CircularProgress />;
  if (!categories) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>Article - Manager</title>
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
            <BlogTable
              page={page}
              setPage={setPage}
              blogs={articles}
              categories={categories}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <CreateBlogForm
        blog={blog}
        open={openDialog}
        highlight={highlight}
        setHighlight={setHighlight}
        handleClose={handleCloseDialog}
        handleChangeTitle={handleChangeValue}
        handleChangeSummary={handleChangeValue}
        handleChangeContent={setContent}
        setImage={setImage}
        requesting={requesting}
        handleCreateBlog={handleCreateBlog}
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}

export default BlogManager;
