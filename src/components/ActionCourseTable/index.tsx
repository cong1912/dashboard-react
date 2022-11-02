import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview, Quiz } from '@mui/icons-material';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { NavigateFunction, useNavigate } from 'react-router';
import { deleteCourse } from 'src/services/CourseService';

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

  const handelDelete = async (params) => {
    await deleteCourse(params.id);
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
        <Tooltip title="Xem danh sách câu hỏi">
          <IconButton
            onClick={() =>
              navigate(`/management/course/${params.id}/questions`)
            }
          >
            <Quiz />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xem danh sách bài học">
          <IconButton
            onClick={() => navigate(`/management/course/${params.id}/lectures`)}
          >
            <Preview />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa khóa học này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa khóa học này">
          <IconButton onClick={handleOpenDeleteDialog}>
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
        handleDelete={() => handelDelete(params)}
      />
    </>
  );
};

export default ActiveCourseTable;
