import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteBlog } from 'src/services/ArticleService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import EditCategoryArticleForm from '../EditCategoryArticleForm';

const EditCategoryForm = lazy(() => import('src/components/EditCategoryForm'));

const ActionCategoryArticleTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
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
        <Tooltip title="Chỉnh sửa danh mục này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa danh mục này">
          <IconButton onClick={() => handelDeleteBlog(params)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditCategoryArticleForm
        id={id}
        open={isOpenUpdateModal}
        sectionId={params.row.sectionId}
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

export default ActionCategoryArticleTable;
