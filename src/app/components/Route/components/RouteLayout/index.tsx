/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export interface RouteLayoutProps<
  ComponentP = object | undefined,
  LayoutP = object | undefined
> extends RouteProps {
  component: React.ComponentType<RouteComponentProps & Dict>;
  layout: React.ComponentType<RouteComponentProps & Dict>;
  componentProps?: ComponentP;
  layoutProps?: LayoutP;
}

const RouteLayout: React.FC<RouteLayoutProps> = ({
  component: Component,
  layout: Layout,
  componentProps,
  layoutProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout {...props} {...layoutProps}>
        <Component {...props} {...componentProps} />
      </Layout>
    )}
  />
);

export default RouteLayout;
