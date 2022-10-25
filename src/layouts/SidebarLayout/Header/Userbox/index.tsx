import { useRef, useState, useContext } from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  Dialog
} from '@mui/material';

import { DialogTitle } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ChangePasswordForm from 'src/components/ChangePasswordForm';

//context
import { ERROR_ACTION } from 'src/reduces/ErrorsReducer';
import { AppContext } from 'src/AppProvider';
import { AppContextType } from 'src/interfaces/AppContextType';
import { SUCCESS_ACTION } from 'src/reduces/SuccessReducer';
import { changePassword } from 'src/services/AuthService';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

const validationSchema = yup.object({
  currentPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .min(8, 'newPassword should be of minimum 8 characters length')
    .required('newPassword is required')
    .when('newPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Both password need to be the same')
    })
});

function HeaderUserbox() {
  const getUser = JSON.parse(localStorage.getItem('userSession') || 'null');
  const user = {
    name: getUser.fullName == null ? 'Unknown' : getUser.fullName,
    avatar:
      getUser.avatar == null
        ? '/defaultAvatar.png'
        : process.env.REACT_APP_API_BACK_END +
          getUser.avatar.replace('public/', ''),
    jobtitle: getUser.email
  };

  const navigate: NavigateFunction = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  // context
  const appContext = useContext(AppContext) as AppContextType;
  const { errorsReducer, successReducer } = appContext;
  const [errors, errorDispatch] = errorsReducer;
  const [success, successDispatch] = successReducer;

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setRequesting(true);
      const data = {
        currentPass: values.currentPassword,
        newPass: values.newPassword
      };
      try {
        await changePassword(data, getUser.id);
        successDispatch({
          type: SUCCESS_ACTION.SET_SUCCESS,
          success: 'Change Password Success'
        });
        resetForm();
        setRequesting(false);
      } catch (error) {
        errorDispatch({
          type: ERROR_ACTION.SET_ERROR,
          error: error.response.data.message
        });
        setRequesting(false);
      }
    }
  });

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handelSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');

    navigate('/login');
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button onClick={handleClickOpenDialog}>
            <AccountBoxTwoToneIcon
              fontSize="small"
              onClick={handleClickOpenDialog}
            />
            <ListItemText primary="Thay đổi mật khẩu" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handelSignOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <DialogTitle>Thay đổi mật khẩu</DialogTitle>
        <ChangePasswordForm
          requesting={requesting}
          formik={formik}
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </>
  );
}

export default HeaderUserbox;
