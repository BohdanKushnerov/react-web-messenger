import { Navigate } from 'react-router-dom';

import useChatStore from '@zustand/store';
import { IRestrictedRouteProps } from '@interfaces/routes/IRestrictedRouteProps';

function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}: IRestrictedRouteProps) {
    const { currentUser, isLoggedIn } = useChatStore(state => state);

  return (
    <>
      {isLoggedIn !== null && !currentUser.displayName &&  <Component />}
      {isLoggedIn === true && currentUser.displayName && (
        <Navigate to={redirectTo} />
      )}
    </>
  );
}

export default RestrictedRoute;
