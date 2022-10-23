import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import ActiveSectionTable from 'src/components/ActionSectionTable';

const SectionsTable = ({ sections }) => {
  const [pageSize, setPageSize] = useState(sections.pageSize);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 220 },
      { field: 'title', headerName: 'Title', width: 170 },
      { field: 'summary', headerName: 'Summary', width: 500 },

      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <ActiveSectionTable {...{ params, rowId, setRowId }} />
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
        Danh sách section
      </Typography>
      <DataGrid
        columns={columns}
        rows={sections.results}
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

export default SectionsTable;
