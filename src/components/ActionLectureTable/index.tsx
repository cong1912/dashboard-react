import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { LECTURE_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { deleteLecture } from 'src/services/LecturesService';

const EditLectureForm = lazy(() => import('src/components/EditLectureForm'));

const ActionLectureTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [id, setId] = useState<number>();
  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDelete = async (params) => {
    await deleteLecture(params.id);
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
        <Tooltip title="Chỉnh sửa bài học này">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa bài học này">
          <IconButton onClick={handleOpenDeleteDialog}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditLectureForm
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

export default ActionLectureTable;
