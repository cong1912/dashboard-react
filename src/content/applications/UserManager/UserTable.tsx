import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

const UserTable = () => {
  const [pageSize, setPageSize] = useState();
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'content', headerName: 'Content', width: 500 },
      { field: 'correct', headerName: 'isCorrect', width: 170 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions'
        // renderCell: (params) => (
        //   <ActionAnswerTable {...{ params, rowId, setRowId }} />
        // )
      }
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        pb: 5
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Danh sách người dùng
      </Typography>
      <DataGrid
        columns={columns}
        rows={[]}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900]
          }
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
};

export default UserTable;
