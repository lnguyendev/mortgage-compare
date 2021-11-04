import { Route, Redirect, withRouter } from 'react-router-dom';
import { useAppSelector } from '../../hooks/appStateHooks';
import NavigationBar from '../layout/NavigationBar';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <NavigationBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
