import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { QUESTION_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { NavigateFunction, useNavigate } from 'react-router';
import { deleteQuestion } from 'src/services/QuestionService';

const EditQuestionForm = lazy(() => import('src/components/EditQuestionForm'));

const ActiveQuestionTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
  const navigate: NavigateFunction = useNavigate();
  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDelete = async (params) => {
    await deleteQuestion(params.id);
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
        <Tooltip title="Xem danh sách đáp án">
          <IconButton
            onClick={() =>
              navigate(`/management/question/${params.id}/answers`)
            }
          >
            <Preview />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sửa câu hỏi này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa câu hỏi này">
          <IconButton onClick={handleOpenDeleteDialog}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditQuestionForm
        id={id}
        open={isOpenUpdateModal}
        newsId={params.row.newsId}
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

export default ActiveQuestionTable;
