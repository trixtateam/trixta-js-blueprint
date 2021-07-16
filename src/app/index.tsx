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
import TrixtaRoles from '../constants/TrixtaRole';
import { GlobalStyle } from '../styles/global-styles';
import ProtectedRoute from './components/Route/components/ProtectedRoute';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { TrixtaActionPage } from './pages/TrixtaActionPage/Loadable';
import { TrixtaExamplesPage } from './pages/TrixtaExamplesPage/Loadable';
import { TrixtaPage } from './pages/TrixtaPage/Loadable';
import { TrixtaReactionPage } from './pages/TrixtaReactionPage/Loadable';
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
        <ProtectedRoute
          exact
          roles={[TrixtaRoles.EXAMPLES]}
          path={process.env.PUBLIC_URL + routes.TRIXTA_EXAMPLES_PAGE}
          component={TrixtaExamplesPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + routes.TRIXTA_REACTION_PAGE}
          component={TrixtaReactionPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
