import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({ handleClickOpenDialog }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh mục tin tức
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpenDialog}
        >
          Tạo danh mục mới
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
