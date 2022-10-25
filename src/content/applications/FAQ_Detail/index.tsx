import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { Box, Card, styled, Container } from '@mui/material';

import FaqFormModal from './FaqFormModal';
import { getFaqDetail } from 'src/services/FaqService';
import { useParams } from 'react-router';

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.general.borderRadiusXl};
        border-top-right-radius: ${theme.general.borderRadius};
        max-width: 380px;
        display: inline-flex;
  `
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.alpha.black[100]};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.general.borderRadiusXl};
        border-top-left-radius: ${theme.general.borderRadius};
        max-width: 380px;
        display: inline-flex;
  `
);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function FaqDetail() {
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  const [detailFaq, setDetailFaq] = useState<any>({});

  const fetchData = () => {
    getFaqDetail(id).then((response) => {
      console.log(response);
      setDetailFaq(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader handleClickOpenDialog={handleClickOpen} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {detailFaq.conversations?.map((con) => {
          return (
            <Box
              key={con.id}
              display="flex"
              alignItems={`flex-${con.status === 0 ? 'start' : 'end'}"`}
              justifyContent={`flex-${con.status === 0 ? 'start' : 'end'}"`}
              py={3}
              px={6}
            >
              <Box
                display="flex"
                alignItems={`flex-${con.status === 1 ? 'start' : 'end'}"`}
                justifyContent={`flex-${con.status === 1 ? 'start' : 'end'}"`}
                flexDirection="column"
                mr={2}
              >
                <CardWrapperSecondary>{con.content}</CardWrapperSecondary>
              </Box>
            </Box>
          );
        })}
      </Container>

      {/* Dialog */}
      {open && (
        <FaqFormModal
          open={open}
          close={handleClose}
          title={detailFaq.question.title}
        />
      )}
      {/* End Dialog */}
    </>
  );
}
