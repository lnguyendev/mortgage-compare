import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '../../hooks/appStateHooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user)!;

  return (
    <Box
      sx={{
        width: '1200px',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" component="h6" color="text.primary">
          Welcome, {`${user.firstname} ${user.lastname}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
