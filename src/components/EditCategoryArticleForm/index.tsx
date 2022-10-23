import React, { useContext, useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogTitle } from '@material-ui/core';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ARTICLE_CATEGORY } from 'src/constants/url';
import useSWR, { mutate } from 'swr';
import { getData } from 'src/helpers/apiHandle';
import CategoryForm from '../CategoryForm';
import { ICategory } from 'src/content/applications/CategoriesCourse';
import { updateCategoryArticle } from 'src/services/CategoryArticleService';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .MuiDialogContent-root': {
      height: 420
    },
    '& .MuiBox-root': {
      width: '90%',
      margin: theme.spacing(1)
    },
    '& .quill': {
      height: 180
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

const EditCategoryArticleForm = ({
  open,
  setIsOpenUpdateModal,
  id,
  sectionId
}) => {
  const classes = useStyles();
  const [requesting, setRequesting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  //fetch data
  const { data: category } = useSWR<ICategory>(
    id ? ARTICLE_CATEGORY + id : null,
    getData
  );

  useEffect(() => {
    if (!id || !category) {
      return;
    } else {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category, id]);

  const handleEditCategory = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const data = {
        name: name,
        description: description
      };

      await updateCategoryArticle(data, id);
      successDispatch({
        type: SUCCESS_ACTION.SET_SUCCESS,
        success: 'Create Lecture Success'
      });
      await mutate(ARTICLE_CATEGORY + id);
      await mutate(ARTICLE_CATEGORY);
      setIsOpenUpdateModal(false);
    } catch (error) {
      errorDispatch({
        type: ERROR_ACTION.SET_ERROR,
        error: error.response.data.message
      });
      setRequesting(false);
    }
  };

  const handleClose = () => {
    setIsOpenUpdateModal(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
      <CategoryForm
        handleSubmitForm={handleEditCategory}
        handleClose={handleClose}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        requesting={requesting}
      />
    </Dialog>
  );
};

export default EditCategoryArticleForm;
