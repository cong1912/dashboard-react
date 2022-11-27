import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActiveTable from 'src/components/ActiveTable';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete } from '@mui/lab';
import TextField from '@mui/material/TextField/TextField';

const BlogTable = ({
  blogs,
  categories,
  filterCategory,
  setFilterCategory,
  page,
  setPage
}) => {
  const [pageSize, setPageSize] = useState(blogs.pageSize);
  const [rowId, setRowId] = useState(null);
  const rows = blogs === undefined ? [] : blogs?.results;

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'summary', headerName: 'Summary', width: 450 },
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
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActiveTable {...{ params, rowId, setRowId, page }} />
        )
      }
    ],
    [rowId]
  );

  if (!blogs) return <CircularProgress />;
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
            Các tin tức
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
        rowCount={blogs.total}
        page={page}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        rowsPerPageOptions={[20]}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        loading={!blogs ? true : false}
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
