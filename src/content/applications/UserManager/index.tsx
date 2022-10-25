import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';

const index = () => {
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
            {/* {!questions ? (
              <CircularProgress />
            ) : (
              <QuestionTable questions={questions} />
            )} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default index;
