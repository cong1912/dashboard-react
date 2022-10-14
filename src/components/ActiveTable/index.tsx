import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const ActiveTable = ({ params, rowId, setRowId }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    // navigate('/');
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
        <IconButton
        // onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActiveTable;
