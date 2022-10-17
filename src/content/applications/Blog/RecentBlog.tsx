import { Card } from '@mui/material';
import BlogTable from './BlogTable';

function RecentBlogs({ blogs }) {
  return (
    <Card>
      <BlogTable blogs={blogs} />
    </Card>
  );
}

export default RecentBlogs;
