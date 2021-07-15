/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SagaInjectionModes, useInjectSaga } from 'redux-injectors';
import { routes } from '../constants/routes';
import { GlobalStyle } from '../styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { TrixtaActionPage } from './pages/TrixtaActionPage/Loadable';
import { TrixtaPage } from './pages/TrixtaPage/Loadable';
import saga from './saga';

export function App() {
  useInjectSaga({ key: 'App', saga, mode: SagaInjectionModes.DAEMON });
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + routes.HOME_PAGE}
          component={HomePage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + routes.AUTH_PAGE}
          component={LoginPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + routes.TRIXTA_PAGE}
          component={TrixtaPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + routes.TRIXTA_ACTION_PAGE}
          component={TrixtaActionPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
