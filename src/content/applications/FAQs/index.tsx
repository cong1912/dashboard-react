import React, { useEffect, useState } from 'react';
import { Grid, Container, Card } from '@mui/material';
import RecentOrders from './FaqTable';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { getFaqs } from 'src/services/FaqService';
import RecentOrdersTable from './FaqTable';

export default function BasicTable() {
  const [listFaq, setListFaq] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getFaqs().then((response) => {
      setListFaq(response.data.results);
    });
  }

  return (
    <>
      <Helmet>
        <title>FAQs</title>
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
            <Card>
              <RecentOrdersTable listFaq={listFaq} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
