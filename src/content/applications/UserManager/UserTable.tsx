import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import ActiveUsersTable from 'src/components/ActionUsersTable';
import { CircularProgress } from '@mui/material';

const UserTable = ({ users }) => {
  const [pageSize, setPageSize] = useState();
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      { field: 'email', headerName: 'Email', width: 400 },
      {
        field: 'fullName',
        headerName: 'Full Name',
        width: 300,
        renderCell: (params) => {
          return (
            <Typography>
              {params.row.fullName == null ? 'Unknown' : params.row.fullName}
            </Typography>
          );
        }
      },
      {
        field: 'avatar',
        headerName: 'AVatar',
        width: 200,
        renderCell: (params) => {
          return (
            <Avatar
              src={
                params.row.image == null
                  ? '/defaulAvatar.png'
                  : params.row.image
              }
            />
          );
        },
        sortable: false,
        filterable: false
      },
      { field: 'amount', headerName: 'Coins', width: 170 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActiveUsersTable {...{ params, rowId, setRowId }} />
        )
      }
    ],
    [rowId]
  );

  if (!users) return <CircularProgress />;
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
        rows={users.results}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        loading={!users ? true : false}
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
