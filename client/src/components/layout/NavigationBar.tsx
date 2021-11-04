import { Link as RouterLink, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { logoutUser } from '../../state/action-creators/auth-actions';
import { useAppDispatch } from '../../hooks/appStateHooks';

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser(history));
  };

  return (
    <Box
      sx={{
        height: '50px',
        width: '100vw',
        backgroundColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          width: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0 auto',
          height: '100%',
        }}
      >
        <Typography variant="h6" component="h6" fontWeight="fontWeightMedium">
          <Link
            component={RouterLink}
            to="/dashboard"
            underline="none"
            color="common.white"
          >
            Mortgage Compare
          </Link>
        </Typography>
        <Button sx={{ color: 'common.white' }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationBar;
