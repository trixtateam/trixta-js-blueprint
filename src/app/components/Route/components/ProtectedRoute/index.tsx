import { useTrixtaAuth } from '@trixta/trixta-js';
import { Location } from 'history';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { routes } from '../../../../../constants/routes';

export interface PrivateRouteProps extends Dict {
  component: React.ComponentType;
  roles?: string[];
  location?: Location;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const result = useTrixtaAuth({ roles });
  return (
    <Route
      {...rest}
      render={props =>
        result.hasAccess && !result.isAuthorizing ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: routes.AUTH_PAGE,
              state: { from: props.location, roles },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
