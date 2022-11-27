import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActionCategoryTable from 'src/components/ActionCategoryTable';
import { CircularProgress } from '@mui/material';

const CategoryTable = ({ categories, page, setPage }) => {
  const [pageSize, setPageSize] = useState(categories.pageSize);
  const [rowId, setRowId] = useState(null);
  const rows = categories === undefined ? [] : categories?.results;

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'description', headerName: 'Description', width: 500 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActionCategoryTable {...{ params, rowId, setRowId, page }} />
        )
      }
    ],
    [rowId]
  );

  if (!categories) return <CircularProgress />;
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
        Danh mục khóa học
      </Typography>
      <DataGrid
        columns={columns}
        loading={!categories ? true : false}
        rows={rows}
        rowCount={categories.total}
        page={page}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[20]}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
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

export default CategoryTable;
