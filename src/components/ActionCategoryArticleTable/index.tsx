import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import EditCategoryArticleForm from '../EditCategoryArticleForm';
import { deleteCategoryArticle } from 'src/services/CategoryArticleService';

const EditCategoryForm = lazy(() => import('src/components/EditCategoryForm'));

const ActionCategoryArticleTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDelete = async (params) => {
    await deleteCategoryArticle(params.id);
    location.reload();
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <Box>
        <Tooltip title="Chỉnh sửa danh mục này">
          <IconButton
            onClick={handleOpenUpdateModal}
            disabled={params.row.specific === 1 ? true : false}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa danh mục này">
          <IconButton
            onClick={handleOpenDeleteDialog}
            disabled={params.row.specific === 1 ? true : false}
          >
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
        handleDelete={() => handelDelete(params)}
      />
    </>
  );
};

export default ActionCategoryArticleTable;
