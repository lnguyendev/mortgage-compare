import { BrowserRouter } from 'react-router-dom';

// components
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
