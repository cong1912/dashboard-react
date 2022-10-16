import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteBlog, updateBlog } from 'src/services/BlogService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy, ChangeEvent, useContext } from 'react';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
// import { AppContext } from 'src/AppProvider';
// import { AppContextType } from 'src/interfaces/AppContextType';
const EditBlogForm = lazy(() => import('src/components/EditBlogForm'));

const ActiveTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  // const [image, setImage] = useState([]);
  // const [content, setContent] = useState('');
  // const [blog, setBlog] = useState({
  //   title: '',
  //   summary: ''
  // });
  // const [requesting, setRequesting] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  // reduces
  // const appContext = useContext(AppContext) as AppContextType;
  // const { errorsReducer, successReducer } = appContext;
  // const [errors, errorDispatch] = errorsReducer;
  // const [success, successDispatch] = successReducer;

  // const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(1);
  //   setBlog({ ...blog, [e.target.name]: e.target.value });
  // };

  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  // const handleCloseUpdateModal = () => {
  //   setIsOpenUpdateModal(false);
  //   setBlog({
  //     title: '',
  //     summary: ''
  //   });
  //   setImage([]);
  //   setContent('');
  // };

  const handelDeleteBlog = async (params) => {
    await deleteBlog(params.id);
    await mutate(NEWS_URL);
  };

  return (
    <>
      <Box>
        <Tooltip title="Edit this room">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete this room">
          <IconButton onClick={() => handelDeleteBlog(params)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditBlogForm
        id={id}
        open={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        // handleClose={handleCloseUpdateModal}
        // handleChangeTitle={handleChangeValue}
        // handleChangeSummary={handleChangeValue}
        // handleChangeContent={setContent}
        // setImage={setImage}
        // requesting={requesting}
        // handleUpdateBlog={handleUpdateBlog}
      />
    </>
  );
};

export default ActiveTable;
