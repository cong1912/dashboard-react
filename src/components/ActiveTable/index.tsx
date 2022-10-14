import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { deleteBlog } from 'src/services/BlogService';
import { NEWS_URL } from 'src/constants/url';
import { mutate } from 'swr';

const ActiveTable = ({ params, rowId, setRowId }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    // navigate('/');
  };
  const handelDeleteBlog = async (params) => {
    await deleteBlog(params.id);
    await mutate(NEWS_URL);
  };

  return (
    <Box>
      <Tooltip title="View room details">
        <IconButton
        // onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton onClick={() => handelDeleteBlog(params)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActiveTable;
