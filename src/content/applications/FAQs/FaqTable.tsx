import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
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

import CardMedia from '@mui/material/CardMedia';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Faq } from 'src/interfaces/Faq.interface';
import FaqDetail from '../FAQ_Detail';

interface ListFaqProps {
  className?: string;
  listFaq: Faq[];
  faqs: any;
  fetchData: any;
}

const RecentOrdersTable: FC<ListFaqProps> = ({ listFaq, faqs, fetchData }) => {
  const [page, setPage] = useState<number>(faqs.currentPage);
  const [limit, setLimit] = useState<number>(20);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    fetchData(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Recent FAQs" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Image 1</TableCell>
              <TableCell>Image 2</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listFaq.map((faq) => {
              return (
                <TableRow hover key={faq.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight="bold"
                      noWrap
                    >
                      {faq.title}
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
                      {faq.content}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CardMedia
                      component="img"
                      height="194"
                      crossOrigin="anonymous"
                      image={
                        process.env.REACT_APP_API_BACK_END +
                        faq.imgUrl1.replace('public/', '')
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <CardMedia
                      component="img"
                      height="194"
                      crossOrigin="anonymous"
                      image={
                        process.env.REACT_APP_API_BACK_END +
                        faq.imgUrl2.replace('public/', '')
                      }
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
                      {format(Date.parse(faq.created), 'MM-dd-yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Detail Faq" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        component={Link}
                        to={'detail/' + faq.id}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
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
          count={faqs.total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={faqs.currentPage}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  listFaq: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  listFaq: []
};

export default RecentOrdersTable;
