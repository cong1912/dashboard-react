import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActiveCourseTable from 'src/components/ActionCourseTable';

const CourseTable = ({ course }) => {
  const [pageSize, setPageSize] = useState(course.pageSize);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 130 },
      { field: 'title', headerName: 'Title', width: 270 },
      { field: 'description', headerName: 'Description', width: 350 },
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
      {
        width: 200,
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActiveCourseTable {...{ params, rowId, setRowId }} />
        )
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
        Danh sách khóa học
      </Typography>
      <DataGrid
        columns={columns}
        rows={course.results}
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

export default CourseTable;
