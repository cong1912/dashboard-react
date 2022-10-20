import { Box, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const index = () => {
  return (
    <Paper>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Box>index</Box>
    </Paper>
  );
};

export default index;
