import { Navigate } from 'react-router-dom';

import useChatStore from '@zustand/store';
import { IRestrictedRouteProps } from '@interfaces/routes/IRestrictedRouteProps';

function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}: IRestrictedRouteProps) {
  const { currentUser } = useChatStore(state => state);

  return currentUser.displayName === null ? (
    <Component />
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default RestrictedRoute;
