import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview, Quiz } from '@mui/icons-material';
import { deleteBlog } from 'src/services/ArticleService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { NavigateFunction, useNavigate } from 'react-router';

const EditCourseForm = lazy(() => import('src/components/EditCourseForm'));

const ActiveCourseTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
  const navigate: NavigateFunction = useNavigate();
  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDeleteBlog = async (params) => {
    await deleteBlog(params.id);
    await mutate(NEWS_URL);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleDeleteBlog = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <Box>
        <Tooltip title="View Question">
          <IconButton
            onClick={() =>
              navigate(`/management/course/${params.id}/questions`)
            }
          >
            <Quiz />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit this course">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete this course">
          <IconButton onClick={() => handelDeleteBlog(params)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditCourseForm
        id={id}
        open={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      />
      <DeleteDialog
        open={openDeleteDialog}
        name="blog"
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDeleteBlog}
      />
    </>
  );
};

export default ActiveCourseTable;
