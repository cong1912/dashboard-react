import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActionQuestionTable from 'src/components/ActionQuestionTable';
import { CircularProgress } from '@mui/material';

const QuestionTable = ({ questions }) => {
  const [pageSize, setPageSize] = useState(questions.pageSize);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'content', headerName: 'Content', width: 450 },
      {
        field: 'image',
        headerName: 'Image',
        width: 200,
        renderCell: (params) => {
          const newImage =
            params.row.imgUrl == null
              ? ''
              : params.row.imgUrl.replace('public/', '');

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
          <ActionQuestionTable {...{ params, rowId, setRowId }} />
        )
      }
    ],
    [rowId]
  );

  if (!questions) return <CircularProgress />;
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
        Danh sách câu hỏi
      </Typography>
      {!questions ? (
        <CircularProgress />
      ) : (
        <DataGrid
          columns={columns}
          rows={questions.results}
          loading={!questions ? true : false}
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
      )}
    </Box>
  );
};

export default QuestionTable;
