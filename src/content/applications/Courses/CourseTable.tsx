import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActiveCourseTable from 'src/components/ActionCourseTable';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField/TextField';

const CourseTable = ({
  course,
  categories,
  filterCategory,
  setFilterCategory,
  setPage,
  page
}) => {
  const [pageSize, setPageSize] = useState(course.pageSize);
  const [rowId, setRowId] = useState(null);
  const rows = course === undefined ? [] : course?.results;

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
          <ActiveCourseTable {...{ params, rowId, setRowId, page }} />
        )
      }
    ],
    [rowId]
  );

  if (!course) return <CircularProgress />;
  if (!categories) return <CircularProgress />;
  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        pb: 5
      }}
    >
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Danh sách khóa học
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {!categories ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              sx={{ mt: 8 }}
              disablePortal
              id="combo-box-demo"
              loading={!course ? true : false}
              options={categories.results}
              onChange={(event, newInputValue) =>
                setFilterCategory(newInputValue)
              }
              value={filterCategory}
              getOptionLabel={(option: { name: string }) => option.name}
              renderInput={(params) => {
                return <TextField {...params} label="Tìm kiếm theo danh mục" />;
              }}
            />
          )}
        </Grid>
      </Grid>
      <DataGrid
        columns={columns}
        rows={rows}
        rowCount={course.total}
        page={page}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        rowsPerPageOptions={[20]}
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
