import { Navigate } from 'react-router-dom';

import useChatStore from '@zustand/store';

import { IPrivateRouteProps } from '@interfaces/routes/IPrivateRouteProps';

const PrivateRoute = ({
  component: Component,
  redirectTo = '/authentication',
}: IPrivateRouteProps) => {
  const isLoggedIn = useChatStore(state => state.isLoggedIn);
  const currentUser = useChatStore(state => state.currentUser);

  return isLoggedIn && currentUser.displayName ? (
    <Component />
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
