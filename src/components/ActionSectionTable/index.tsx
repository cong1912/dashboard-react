import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { deleteBlog } from 'src/services/ArticleService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { NavigateFunction, useNavigate } from 'react-router';

const EditSectionForm = lazy(() => import('src/components/EditSectionForm'));

const ActiveSectionTable = ({ params, rowId, setRowId }) => {
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
        <Tooltip title="Xem danh sách bài học">
          <IconButton
            onClick={() =>
              navigate(`/management/section/${params.id}/lectures`)
            }
          >
            <Preview />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa section này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa section này">
          <IconButton onClick={() => handelDeleteBlog(params)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditSectionForm
        id={id}
        open={isOpenUpdateModal}
        newId={params.row.newsId}
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

export default ActiveSectionTable;
