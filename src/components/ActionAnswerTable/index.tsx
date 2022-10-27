import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { deleteAnswer } from 'src/services/AnswerService';

const EditQuizAnswerForm = lazy(
  () => import('src/components/EditQuizAnswerForm')
);

const ActionAnswerTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDelete = async (params) => {
    await deleteAnswer(params.id);
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
        <Tooltip title="Chỉnh sửa đáp án này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa đáp án này">
          <IconButton onClick={handleOpenDeleteDialog}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditQuizAnswerForm
        id={id}
        open={isOpenUpdateModal}
        questionId={params.row.questionId}
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

export default ActionAnswerTable;
