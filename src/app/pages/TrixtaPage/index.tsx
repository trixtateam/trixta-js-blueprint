/**
 *
 * TrixtaPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';
import { routes } from '../../../constants/routes';
import TrixtaRoles from '../../../constants/TrixtaRole';
import ProtectedRoute from '../../components/Route/components/ProtectedRoute';
import { TrixtaNavBar } from '../../components/Trixta/components/TrixtaNavBar';
import { TrixtaActionPage } from '../TrixtaActionPage';
import { TrixtaExamplesPage } from '../TrixtaExamplesPage';
import { TrixtaReactionPage } from '../TrixtaReactionPage';
import { messages } from './messages';
interface Props {}

export function TrixtaPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(messages.metaTitle())}</title>
        <meta
          name={t(messages.metaTitle())}
          content={t(messages.metaDescription())}
        />
      </Helmet>
      <TrixtaNavBar />
      <Switch>
        <Route
          exact
          path={routes.TRIXTA_ACTION_PAGE}
          component={TrixtaActionPage}
        />
        <ProtectedRoute
          exact
          roles={[TrixtaRoles.EXAMPLES]}
          path={routes.TRIXTA_EXAMPLES_PAGE}
          component={TrixtaExamplesPage}
        />
        <Route
          exact
          path={routes.TRIXTA_REACTION_PAGE}
          component={TrixtaReactionPage}
        />
      </Switch>
    </>
  );
}

const Div = styled.div``;
