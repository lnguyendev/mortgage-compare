import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/common/NotFound';
import PrivateRoute from './components/common/PrivateRoute';

// actions
import { useAppDispatch } from './hooks/appStateHooks';
import { loginUser, logoutUser } from './state/action-creators/auth-actions';
import { User } from './state/interface/auth-interface';

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.user) {
      const user: { data: User; expiration: number } = JSON.parse(
        localStorage.user
      );
      const currentTime = Date.now() / 1000;

      if (user.expiration < currentTime) {
        dispatch(logoutUser());
        history.push('/');

        return;
      }

      dispatch(loginUser(user.data));
    }
  }, [dispatch, history]);

  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
