import { Navigate } from 'react-router-dom';

import useChatStore from '@store/store';

interface IPrivateRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}
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
