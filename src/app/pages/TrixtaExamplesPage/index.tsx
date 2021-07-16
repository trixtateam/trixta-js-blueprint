/**
 *
 * TrixtaExamplesPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useTrixtaExample } from '../../../hooks/useTrixtaExample';
import { PageWrapper } from '../../components/PageWrapper';
import { DebugModeSwitch } from '../../components/Trixta/components/DebugModeSwitch';
import { TrixtaActionExample } from '../../components/Trixta/components/TrixtaActionExample';
import { TrixtaActionHookExample } from '../../components/Trixta/components/TrixtaActionHookExample';
import { TrixtaNavBar } from '../../components/Trixta/components/TrixtaNavBar';
import { messages } from './messages';


interface Props {}

export function TrixtaExamplesPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { debugMode, setDebugMode } = useTrixtaExample({
    debug: false,
  });
  const roleName = 'examples';
  const actionName = 'examples';
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
      <PageWrapper>
        <DebugModeSwitch debugMode={debugMode} setDebugMode={setDebugMode} />
        <TrixtaActionExample
          roleName={roleName}
          actionName={actionName}
          debugMode={debugMode}
        />
        <TrixtaActionHookExample
          roleName={roleName}
          actionName={actionName}
          debugMode={debugMode}
        />
      </PageWrapper>
    </>
  );
}

const Div = styled.div``;
