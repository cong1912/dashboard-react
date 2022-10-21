import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { Box, Card, styled, Container, Modal, Dialog } from '@mui/material';

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
        flex-direction: column;
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
  const [imgModal, setImgModal] = React.useState('');
  const [openModalImage, setOpenModalImage] = React.useState(false);
  const handleOpenModalImage = (imgUrl) => {
    setImgModal(imgUrl);
    setOpenModalImage(true);
  };
  const handleCloseModalImage = () => {
    setImgModal('');
    setOpenModalImage(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [detailFaq, setDetailFaq] = useState<any>({});

  useEffect(() => {
    try {
      getFaqDetail(id).then((response) => {
        console.log(response);
        setDetailFaq(response.data);
      });
    } catch (error) {
      console.log(error);
    }
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
              alignItems="flex-start"
              justifyContent={con.status === 1 ? 'flex-start' : 'flex-end'}
              py={1}
              px={2}
            >
              <Box
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                flexDirection="column"
              >
                {con.status === 1 ? (
                  <CardWrapperSecondary>
                    {con.content}
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      {con.imgUrl1 != '' && (
                        <img
                          width={60}
                          height={60}
                          onClick={() =>
                            handleOpenModalImage(
                              `http://139.59.104.129:8000/${con.imgUrl1.replace(
                                'public/',
                                ''
                              )}`
                            )
                          }
                          crossOrigin="anonymous"
                          src={`http://139.59.104.129:8000/${con.imgUrl1.replace(
                            'public/',
                            ''
                          )}`}
                          loading="lazy"
                        />
                      )}
                      {con.imgUrl2 != '' && (
                        <img
                          onClick={() =>
                            handleOpenModalImage(
                              `http://139.59.104.129:8000/${con.imgUrl1.replace(
                                'public/',
                                ''
                              )}`
                            )
                          }
                          width={60}
                          height={60}
                          crossOrigin="anonymous"
                          src={`http://139.59.104.129:8000/${con.imgUrl2.replace(
                            'public/',
                            ''
                          )}`}
                          loading="lazy"
                        />
                      )}
                    </Box>
                  </CardWrapperSecondary>
                ) : (
                  <CardWrapperPrimary>
                    {con.content}
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      {con.imgUrl1 != '' && (
                        <img
                          width={60}
                          height={60}
                          onClick={() =>
                            handleOpenModalImage(
                              `http://139.59.104.129:8000/${con.imgUrl1.replace(
                                'public/',
                                ''
                              )}`
                            )
                          }
                          crossOrigin="anonymous"
                          src={`http://139.59.104.129:8000/${con.imgUrl1.replace(
                            'public/',
                            ''
                          )}`}
                          loading="lazy"
                        />
                      )}
                      {con.imgUrl2 != '' && (
                        <img
                          onClick={() =>
                            handleOpenModalImage(
                              `http://139.59.104.129:8000/${con.imgUrl1.replace(
                                'public/',
                                ''
                              )}`
                            )
                          }
                          width={60}
                          height={60}
                          crossOrigin="anonymous"
                          src={`http://139.59.104.129:8000/${con.imgUrl2.replace(
                            'public/',
                            ''
                          )}`}
                          loading="lazy"
                        />
                      )}
                    </Box>
                  </CardWrapperPrimary>
                )}
              </Box>
            </Box>
          );
        })}
      </Container>

      {/* Dialog */}
      {open && <FaqFormModal open={open} close={handleClose} />}
      {/* End Dialog */}

      {/* Modal Image */}
      <Dialog
        open={openModalImage}
        onClose={handleCloseModalImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img crossOrigin="anonymous" src={imgModal} loading="lazy" />
      </Dialog>
      {/* End Modal Image */}
    </>
  );
}
