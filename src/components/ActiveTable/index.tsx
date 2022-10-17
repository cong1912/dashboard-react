import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteBlog } from 'src/services/BlogService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';
import { useState, lazy } from 'react';

const EditBlogForm = lazy(() => import('src/components/EditBlogForm'));

const ActiveTable = ({ params, rowId, setRowId }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const [id, setId] = useState<number>();

  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
    setId(params.id);
  };

  const handelDeleteBlog = async (params) => {
    await deleteBlog(params.id);
    await mutate(NEWS_URL);
  };

  return (
    <>
      <Box>
        <Tooltip title="Edit this room">
          <IconButton onClick={handleOpenUpdateModal}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete this room">
          <IconButton onClick={() => handelDeleteBlog(params)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <EditBlogForm
        id={id}
        open={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      />
    </>
  );
};

export default ActiveTable;
