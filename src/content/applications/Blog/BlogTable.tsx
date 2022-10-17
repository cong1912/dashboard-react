import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import ActiveTable from 'src/components/ActiveTable';

const BlogTable = ({ blogs }) => {
  const [pageSize, setPageSize] = useState(20);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'summary', headerName: 'Summary', width: 200 },
      {
        field: 'image',
        headerName: 'Image',
        width: 200,
        renderCell: (params) => {
          const newImage = params.row.image.slice(7, params.value.length);

          return (
            <img
              crossOrigin="anonymous"
              src={process.env.REACT_APP_API_BACK_END + newImage}
              loading="lazy"
              width="30%"
            />
          );
        },
        sortable: false,
        filterable: false
      },
      { field: 'viewed', headerName: 'Viewed', width: 200 },
      { field: 'shared', headerName: 'Shared', width: 200 },
      {
        field: 'category',
        headerName: 'Category',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['basic', 'editor', 'admin'],
        editable: true
      },
      {
        field: 'status',
        headerName: 'status',
        width: 100,
        type: 'boolean',
        editable: true
      },

      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => <ActiveTable {...{ params, rowId, setRowId }} />
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
        Manage Blogs
      </Typography>
      <DataGrid
        columns={columns}
        rows={blogs.results}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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

export default BlogTable;
