import { Navigate } from 'react-router-dom';

import useChatStore from '@zustand/store';
import { IRestrictedRouteProps } from '@interfaces/routes/IRestrictedRouteProps';
import { Suspense } from 'react';

function RestrictedRoute({
  component: Component,
  redirectTo = '/',
}: IRestrictedRouteProps) {
  const { currentUser, isLoggedIn } = useChatStore(state => state);

  return (
    <>
      {isLoggedIn !== null && !currentUser.displayName && (
        <Suspense>
          <Component />
        </Suspense>
      )}
      {isLoggedIn === true && currentUser.displayName && (
        <Navigate to={redirectTo} />
      )}
    </>
  );
}

export default RestrictedRoute;
