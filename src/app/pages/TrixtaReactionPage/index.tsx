/**
 *
 * TrixtaActionPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useTrixtaExample } from '../../../hooks/useTrixtaExample';
import { PageWrapper } from '../../components/PageWrapper';
import { TrixtaNavBar } from '../../components/TrixtaNavBar';
import { DebugModeSwitch } from '../TrixtaPage/DebugModeSwitch';
import { TrixtaReactionExample } from './components/TrixtaReactionExample';
import { TrixtaReactionHookExample } from './components/TrixtaReactionHookExample';
import { messages } from './messages';

interface Props {}

export function TrixtaReactionPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const {
    debugMode,
    setDebugMode,
    selectedRoleName,
    selectedReactionName,
  } = useTrixtaExample({
    debug: false,
  });
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
        {/* //TODO dropdown {selectedRoleName} drop */}
        {/* //TODO dropdown {selectedReactionName} drop */}
        {selectedRoleName && selectedReactionName && (
          <TrixtaReactionExample
            roleName={selectedRoleName}
            reactionName={selectedReactionName}
            debugMode={debugMode}
          />
        )}
        {selectedRoleName && selectedReactionName && (
          <TrixtaReactionHookExample
            roleName={selectedRoleName}
            reactionName={selectedReactionName}
            debugMode={debugMode}
          />
        )}
      </PageWrapper>
    </>
  );
}

const Div = styled.div``;
