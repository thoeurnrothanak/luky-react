import { Route } from 'react-router';
import Error404 from 'routes/Pages/404';
import KeycloakAuth from 'services/auth/Keycloak';

const PermissionRoute = ({ every = [], some = [], ...reset }) => {
  let isAllowed = false;

  if (every.length > 0) {
    isAllowed = KeycloakAuth.hasEveryPermission(every);
  } else if (some.length > 0) {
    isAllowed = KeycloakAuth.hasSomePermission(some);
  }

  if (isAllowed) {
    return <Route {...reset} />;
  }
  return <Route component={Error404} />;
};

export default PermissionRoute;
