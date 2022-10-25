import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import { getData } from 'src/helpers/apiHandle';
import { USERS_URL } from 'src/constants/url';
import useSWR from 'swr';
import { Users } from 'src/interfaces/User';
import UserTable from './UserTable';

const index = () => {
  // fetch data
  const { data: users } = useSWR<Users>(USERS_URL, getData);

  if (!users) return <CircularProgress />;
  return (
    <>
      <Helmet>
        <title>User - Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            {!users ? <CircularProgress /> : <UserTable users={users} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default index;
