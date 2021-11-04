import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const NotFound = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
        color="primary.main"
        fontWeight="fontWeightMedium"
      >
        Page Not Found
      </Typography>
      <Typography variant="body2" gutterBottom textAlign="center">
        Sorry, what you are trying to access does not exist. Return to{' '}
        <Link component={RouterLink} to="/dashboard" underline="none">
          Dashboard
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default NotFound;
