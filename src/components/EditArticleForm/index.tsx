import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  TextField,
  Theme,
  Button,
  FormLabel,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel
} from '@material-ui/core';
import QuillInput from '../QuillInput';
import { multiFetcher } from 'src/helpers/apiHandle';
import { ARTICLE_CATEGORY, NEWS_URL } from 'src/constants/url';
import useSWR, { mutate } from 'swr';
import { updateBlog } from 'src/services/ArticleService';

import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
interface IBlog {
  value: {
    article: {
      id: number;
      title: string;
      summary: string;
      content: string;
      categoryId: number;
      image: string;
      highlight: boolean;
    };
  };
}

export interface ICategories {
  value: {
    results: ICategory[];
  };
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryFormData {
  id: string;
  name: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    },
    '& .ql-container': {
      height: 300
    }
  }
}));

const EditArticleForm = ({ open, id, setIsOpenUpdateModal }) => {
  const classes = useStyles();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [highlight, setHighlight] = useState<boolean>(false);
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;
  const [categories, setCategories] = useState([]);
  const [categoriesUpdate, setCategoriesUpdate] = useState<ICategoryFormData>();
  const [image, setImage] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [indexCategory, setIndexCategory] = useState<number>();

  const { data, error } = useSWR(
    id ? [NEWS_URL + id, ARTICLE_CATEGORY] : null,
    multiFetcher
  );

  useEffect(() => {
    if (!id || error || !data) {
      return;
    }

    const [article, articleCategory]: [IBlog, ICategories] =
      data as unknown as [IBlog, ICategories];

    setTitle(article.value.article.title);
    setHighlight(article.value.article.highlight);
    setSummary(article.value.article.summary);
    setContent(article.value.article.content);
    setImageUrl(
      `${
        process.env.REACT_APP_API_BACK_END +
        article.value.article.image.slice(7, article.value.article.image.length)
      }`
    );
    setCategories(articleCategory.value.results);
    setIndexCategory(
      articleCategory.value.results.findIndex(
        (element) => element.id == article.value.article.categoryId
      )
    );
  }, [data, id]);

  const handleUpdateBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('highlight', highlight as unknown as string);
      if (categoriesUpdate) formData.append('categoryId', categoriesUpdate.id);
      if (image[0]) {
        formData.append('file', image[0]);
      }

      await updateBlog(formData, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Edit Blog Success'
      });
      await mutate(NEWS_URL);
      await mutate(NEWS_URL + id);
      setIsOpenUpdateModal(false);
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateModal(false);
  };

  const handleChange = (files) => {
    setImage(files);
  };

  if (!data) return <div></div>;
  return (
    <Dialog
      open={open}
      onClose={handleCloseUpdateModal}
      fullWidth={true}
      maxWidth="xl"
    >
      <DialogTitle>Chỉnh sửa tin tức</DialogTitle>
      <form className={classes.root} onSubmit={handleUpdateBlog}>
        <DialogContent>
          {!data ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Description"
                  name="summary"
                  onChange={(e) => setSummary(e.target.value)}
                  value={summary}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <QuillInput
                  content={content}
                  handleChangeContent={setContent}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Thumb</FormLabel>
                <DropzoneArea
                  initialFiles={[imageUrl]}
                  onChange={handleChange}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  maxFileSize={5000000}
                  filesLimit={1}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={highlight} />}
                  onChange={(e) => {
                    setHighlight(!highlight);
                  }}
                  labelPlacement="start"
                  label="Tin nổi bật:"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            size="large"
            type="submit"
            disabled={requesting}
          >
            Submit
          </Button>
          <Button onClick={handleCloseUpdateModal}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditArticleForm;
