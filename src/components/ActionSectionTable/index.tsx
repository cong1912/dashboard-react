import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { SECTION_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';
import DeleteDialog from '../DeleteDialog';
import { NavigateFunction, useNavigate } from 'react-router';
import { deleteSection } from 'src/services/SessionService';

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

  const handelDelete = async (params) => {
    await deleteSection(params.id);
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
          <IconButton onClick={handleOpenDeleteDialog}>
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
        handleDelete={() => handelDelete(params)}
      />
    </>
  );
};

export default ActiveSectionTable;
