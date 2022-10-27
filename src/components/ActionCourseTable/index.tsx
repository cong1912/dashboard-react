import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview, Quiz } from '@mui/icons-material';
import { deleteBlog } from 'src/services/ArticleService';
import { COURSE_URL, NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
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
    await mutate(COURSE_URL);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDelete = () => {
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
        <Tooltip title="Xem các sections">
          <IconButton
            onClick={() => navigate(`/management/course/${params.id}/sections`)}
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
          <IconButton onClick={handleOpenDelete}>
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
