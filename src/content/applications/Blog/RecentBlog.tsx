import { Card } from '@mui/material';
import BlogTable from './BlogTable';

function RecentBlogs({
  blogs,
  handleClickOpenDialog,
  handleClose,
  handleOpenDeleteDialog
}) {
  return (
    <Card>
      <BlogTable
        blogs={blogs}
        handleClickOpenDialog={handleClickOpenDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleClose={handleClose}
      />
    </Card>
  );
}

export default RecentBlogs;
