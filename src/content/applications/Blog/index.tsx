import { ChangeEvent, lazy, useContext, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import BlogTable from './BlogTable';

import { getData } from 'src/helpers/apiHandle';
import { ARTICLE_CATEGORY, NEWS_URL } from 'src/constants/url';
import { createBlog } from 'src/services/BlogService';

import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import {
  ICategories,
  ICategory,
  ICategoryFormData
} from 'src/components/EditBlogForm';

const CreateBlogForm = lazy(() => import('src/components/CreateBlogForm'));

interface IBlog {
  title: string;
  summary: string;
  avatar: string;
}
interface IBlogs {
  sizePage: number;
  results: IBlog[];
}

function BlogManager() {
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState<ICategory>();
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
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const { data: article } = useSWR<IBlogs>(NEWS_URL, getData);
  const { data: categories } = useSWR<ICategories>(ARTICLE_CATEGORY, getData);
  const objectEmpty = {
    pageSize: 1,
    results: [{ id: 1, image: 'public/uploads/file-1665731987187.png' }]
  };
  const response = article || objectEmpty;

  const objectEmptyCategories = {
    value: {
      results: [{ id: 4, name: 'Thông tin chứng khoán' }]
    }
  };
  const resCategories = categories || objectEmptyCategories;

  // setCategory(resCategories.value.results[0]);

  //dialog create,edit
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
      formData.append('file', image[0]);
      formData.append('content', content);
      formData.append('title', blog.title);
      formData.append('summary', blog.summary);
      formData.append('categoryId', category.id as unknown as string);

      await createBlog(formData);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Blog Success'
      });
      await mutate(NEWS_URL);
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

  return (
    <>
      <Helmet>
        <title>Blog - Manager</title>
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
            <BlogTable blogs={response} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <CreateBlogForm
        blog={blog}
        open={openDialog}
        handleClose={handleCloseDialog}
        handleChangeTitle={handleChangeValue}
        handleChangeSummary={handleChangeValue}
        handleChangeContent={setContent}
        setImage={setImage}
        requesting={requesting}
        handleCreateBlog={handleCreateBlog}
        categories={resCategories}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}

export default BlogManager;
