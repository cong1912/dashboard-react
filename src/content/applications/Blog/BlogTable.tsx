import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import BulkActions from './BulkActions';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  handleClickOpenDialog: () => void;
  handleClose: () => void;
  handleOpenDeleteDialog: () => void;
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const BlogTable: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleClickOpenDialog,
  handleClose,
  handleOpenDeleteDialog
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  //   const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        // action={
        //   //   <Box width={150}>
        //   //     <FormControl fullWidth variant="outlined">
        //   //       <InputLabel>Status</InputLabel>
        //   //       <Select
        //   //         value={filters.status || 'all'}
        //   //         onChange={handleStatusChange}
        //   //         label="Status"
        //   //         autoWidth
        //   //       >
        //   //         {statusOptions.map((statusOption) => (
        //   //           <MenuItem key={statusOption.id} value={statusOption.id}>
        //   //             {statusOption.name}
        //   //           </MenuItem>
        //   //         ))}
        //   //       </Select>
        //   //     </FormControl>
        //   //   </Box>
        // }
        title="Blogs List"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>numerical order</TableCell>
              <TableCell>title</TableCell>
              <TableCell>description</TableCell>
              <TableCell>Thumb</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.sourceDesc}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img src="data:image/jpeg;base64,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" />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleClickOpenDialog}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleOpenDeleteDialog}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

BlogTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

BlogTable.defaultProps = {
  cryptoOrders: []
};

export default BlogTable;
