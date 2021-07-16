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
import { TrixtaNavBar } from '../../components/Trixta/components/TrixtaNavBar';
import { TrixtaActionExample } from '../../components/Trixta/components/TrixtaActionExample';
import { TrixtaActionHookExample } from '../../components/Trixta/components/TrixtaActionHookExample';
import { messages } from './messages';
import { DebugModeSwitch } from '../../components/Trixta/components/DebugModeSwitch';

interface Props {}

export function TrixtaActionPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const {
    debugMode,
    setDebugMode,
    selectedActionName,
    actionList,
    roles,
    selectedRoleName,
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
        {roles[0]}
        {/* //TODO dropdown {selectedRoleName} drop */}
        {/* //TODO dropdown {selectedActionName} drop */}
        {/* //TODO dropdown {selectedRoleName} drop */}
        {/* //TODO dropdown {selectedReactionName} drop */}
        {selectedRoleName && selectedActionName && (
          <TrixtaActionExample
            roleName={selectedRoleName}
            actionName={selectedActionName}
            debugMode={debugMode}
          />
        )}
        {selectedRoleName && selectedActionName && (
          <TrixtaActionHookExample
            roleName={selectedRoleName}
            actionName={selectedActionName}
            debugMode={debugMode}
          />
        )}
      </PageWrapper>
    </>
  );
}

const Div = styled.div``;
