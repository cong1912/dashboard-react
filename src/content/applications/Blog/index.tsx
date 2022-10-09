import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentBlog from './RecentBlog';
import CreateBlogForm from 'src/components/CreateBlogForm';
import DeleteDialog from 'src/components/DeleteDialog';

function BlogManager() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  //dialog create,edit
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  // dialog delete
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteBlog = () => {};

  return (
    <>
      <Helmet>
        <title>Blog - Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader handleClickOpenDialog={handleClickOpenDialog} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentBlog
              handleClickOpenDialog={handleClickOpenDialog}
              handleClose={handleCloseDialog}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <CreateBlogForm open={openDialog} handleClose={handleCloseDialog} />
      <DeleteDialog
        open={openDeleteDialog}
        name="blog"
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDeleteBlog}
      />
    </>
  );
}

export default BlogManager;
