import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useState } from 'react';
import Text from 'src/components/Text';

const ActiveUsersTable = ({ params, rowId, setRowId }) => {
  console.log(params.row);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Box>
        <Tooltip title="Xem thông tin người dùng này">
          <IconButton onClick={() => setIsOpenDialog(true)}>
            <Preview />
          </IconButton>
        </Tooltip>
      </Box>
      <>
        <Dialog open={isOpenDialog} onClose={handleClose}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Chi tiết người dùng
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Tên:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>
                        {params.row.fullName == null
                          ? 'Unknown'
                          : params.row.fullName}
                      </b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Ngày sinh:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>
                        {params.row.birthday == null
                          ? 'Unknown'
                          : params.row.birthday}
                      </b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Giới tính:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">
                        {params.row.gender == null
                          ? 'Unknown'
                          : params.row.gender}
                      </Text>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      email:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">
                        {params.row.email == null
                          ? 'Unknown'
                          : params.row.email}
                      </Text>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Coins:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">
                        {params.row.amount == null
                          ? 'Unknown'
                          : params.row.amount}
                      </Text>
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Dialog>
      </>
    </>
  );
};

export default ActiveUsersTable;
