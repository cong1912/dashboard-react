import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActionLectureTable from 'src/components/ActionLectureTable';
import { CircularProgress } from '@mui/material';

const LecturesTable = ({ lectures, sectionId, data }) => {
  const [pageSize, setPageSize] = useState(data.pageSize);
  const rows = lectures === undefined ? [] : lectures?.results;

  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'name', headerName: 'Name', width: 170 },
      { field: 'content', headerName: 'Content', width: 400 },
      { field: 'price', headerName: 'price', width: 100 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActionLectureTable {...{ params, rowId, setRowId, sectionId }} />
        )
      }
    ],
    [rowId]
  );

  // if (!lectures) return <CircularProgress />;
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
        Danh sách bài học
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={!lectures ? true : false}
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

export default LecturesTable;
